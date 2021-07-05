/*
 * @Author: xiaoguang_10@qq.com
 * @LastEditors: xiaoguang_10@qq.com
 * @Date: 2021-06-30 16:16:18
 * @LastEditTime: 2021-06-30 19:47:09
 */

const { spawn } = require('child_process');
const child = spawn('pwd');

// // 返回ChildProcess对象，默认情况下其上的stdio不为null
// const ls = spawn("ls", ["-lh"]);

// ls.stderr.on("data", data => {
//   console.error(`stderr: ${data}`);
// });

// ls.stdout.on("data", data => {
//     console.log(`stdout: ${data}`);
// });

// ls.on("close", code => {
//     console.log(`子进程退出，退出码 ${code}`);
// });


// const find = spawn('find', ['.', '-type', 'f']);
// const wc = spawn('wc', ['-l']);

// find.stdout.pipe(wc.stdin);

// wc.stdout.on('data', (data) => {
//   console.log(`Number of files ${data}`);
// });


setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});


Promise.resolve().then(res=>{
  console.log('resolve')
})

process.nextTick(()=>{
  console.log('nextTick')
})