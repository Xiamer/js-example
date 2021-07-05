/*
 * @Author: xiaoguang_10@qq.com
 * @LastEditors: xiaoguang_10@qq.com
 * @Date: 2021-06-30 15:33:27
 * @LastEditTime: 2021-06-30 15:41:00
 */
const Koa = require('koa');
const app = new Koa();

// 错误处理中间件, 洋葱最外层
app.use(async (ctx, next) => {
  console.log("1111");
  try {
    await next();
  } catch (error) {
    // 响应用户
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = error.message;
    ctx.app.emit('error', error); // 触发应用层级错误事件
  }
});

app.use(async (ctx, next) => {
  console.log("前置操作");
  await next();
  console.log("后置操作");
});

app.use(ctx => {
  // 抛出错误, 也可以理解为模拟错误发生
  throw new Error("未知错误");
  console.log("执行任务...");
});

process.on('uncaughtException', err => {
  console.error('有一个未捕获的错误', err)
  process.exit(1) //强制性的（根据 Node.js 文档）
})

// 全局错误事件监听
app.on('error', (error) => {
  console.error('error---- start');
  console.error('error----', error);
  console.error('error---- end');
});

// 语法糖, 等同于http.createServer(app.callback()).listen(3000);
app.listen(3000);