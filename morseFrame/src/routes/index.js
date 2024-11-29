const Router = require('koa-router');
const router = new Router();


// 其他路由可以在这里添加
const fs = require('fs').promises;
const path = require('path');

// 获取所有消息的GET路由
router.get('/all', async (ctx) => {
    const dataPath = path.join(__dirname, '../data.json');
    const data = await fs.readFile(dataPath, 'utf8');
    ctx.body = JSON.parse(data);
});

// 保存消息的POST路由
router.post('/post', async (ctx) => {
    try {
        const message = ctx.request.body;
        const dataPath = path.join(__dirname, '../data.json');
        
        // 读取现有数据
        let data = [];
        try {
            const fileContent = await fs.readFile(dataPath, 'utf8');
            data = JSON.parse(fileContent);
        } catch (err) {
            // 如果文件不存在或为空,使用空数组
        }
        // 添加新消息
        data.data.push(message);

        // 写入文件
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2));

        ctx.body = {
            success: true,
            message: '消息已保存'
        };
    } catch (err) {
      console.log(err)
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: '保存消息失败'
        };
    }
});


module.exports = router;
