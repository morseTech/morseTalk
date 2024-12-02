const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');

class child extends Koa {
  // 构造函数
  constructor(options = {}) {
    super(options);
    this.use(cors());
    this.use(bodyParser());
  }



  // 重写现有方法
  createContext(req, res) {
    // 调用父类方法
    const ctx = super.createContext(req, res);
    
    // 扩展上下文
    ctx.success = (data) => {
      ctx.body = {
        code: 0,
        data: data
      };
    };

    ctx.error = (message, code=500) => {
      ctx.body = {
        code: code,
        message: message
      };
    };

      // 与主进程通信
    ctx.requestMaster = (type, key, value) => {
    return new Promise((resolve) => {
      const msgId = Date.now();
      process.send({ 
        type, 
        key, 
        value, 
        id: msgId 
      });

      process.once('message', (response) => {
        if (response.id === msgId) {
          resolve(response);
        }
      });
    });
  }
    
    return ctx;
  }

  // 自定义错误处理
  handleError(err, ctx) {
    // 集中的错误处理逻辑
    console.error('Caught an error:', err);
    
    ctx.error(500,err.message || 'Internal Server Error');
  }
}

module.exports = child;