const Router = require('koa-router');
const router = new Router();

// 示例路由
router.get('/', (ctx) => {
    ctx.body = { message: 'Welcome to morseFrame API!' };
});

// 其他路由可以在这里添加

module.exports = router;
