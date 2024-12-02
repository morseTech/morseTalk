const cluster = require('cluster');
const os = require('os');
const fs = require('fs');
const ChildKoa = require('./child');
const db = require('./kv');

const routes = require('./routes/index');


  if (cluster.isMaster) {
    const dataManager = new db('./data_snapshot.json');
  
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
      const worker = cluster.fork();
  
      worker.on('message', (msg) => {
        switch(msg.type) {
          case 'ALL':
            console.log('master all is running',dataManager.store.entries())
            worker.send({
              id: msg.id,
              data: Array.from(dataManager.store.entries()).sort((a, b) => b[0] - a[0]).map(([key, value]) => value) // 逆序提取对象部分
            });
            break;
          case 'GET':
            worker.send({
              id: msg.id,
              data: dataManager.get(msg.key)
            });
            break;
          case 'SET':
            dataManager.set(msg.key, msg.value);
            worker.send({
              id: msg.id,
              success: true
            });
            break;
          case 'DELETE':
            dataManager.delete(msg.key);
            worker.send({
              id: msg.id,
              success: true
            });
            break;
        }
      });
    }
  
    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });
  
  } else {
    // 在子进程中创建 ChildKoa 实例并启动
    const childApp = new ChildKoa();

    childApp.use(routes.routes()).use(routes.allowedMethods());
  
    const PORT = process.env.PORT || 3000;

    childApp.listen(PORT, () => {
      console.log(`Worker ${process.pid} started on http://localhost:${PORT}`);
    });
  }

