const Router = require('koa-router');
const router = new Router();


// 其他路由可以在这里添加
const fs = require('fs').promises;
const path = require('path');

// 获取所有消息的GET路由
router.get('/all', async (ctx) => {
    const result = await ctx.requestMaster('ALL');
    if (result) {
        ctx.success(result.data);
    } else {
        ctx.error('获取数据失败');
    }
});

// 保存消息的POST路由
router.post('/post', async (ctx) => {
    try {
        const message = ctx.request.body;
        console.log(message)
        const result = await ctx.requestMaster('SET', new Date().getTime(), message);

        ctx.success({
            success: true,
            message: '消息已保存'
        });
    } catch (err) {
      console.log(err)
        ctx.error('保存消息失败');
    }
});

router.get('/', async (ctx) => {
    ctx.body = `i'm a worker Pid ${process.pid}`;
});

router.get('/data/:key', async (ctx) => {
  console.log(ctx.params.key)
  const result = await ctx.requestMaster('GET', ctx.params.key);
      if (result) {
        ctx.success(result.data);
    } else {
        ctx.error('获取数据失败');
    }
});

router.post('/data', async (ctx) => {
  const { key, value } = ctx.request.body;
  const result = await ctx.requestMaster('SET', key, value);
  if (result.success) {
    ctx.success({ success: true });
} else {
    ctx.error('设置数据失败');
}
});

router.delete('/data/:key', async (ctx) => {
  const result = await ctx.requestMaster('DELETE', ctx.params.key);
  if (result.success) {
    ctx.success({ success: true });
} else {
    ctx.error('删除数据失败');
}
});


module.exports = router;
