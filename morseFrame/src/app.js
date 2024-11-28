const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const routes = require('./routes/index');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());
app.use(routes.routes()).use(routes.allowedMethods());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
