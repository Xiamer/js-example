/*
 * @Author: xiaoguang_10@qq.com
 * @LastEditors: xiaoguang_10@qq.com
 * @Date: 2021-06-30 15:15:29
 * @LastEditTime: 2021-06-30 15:43:39
 */

// const fs = require('fs');
// process.on('uncaughtException', function(err) {
//   console.error('Error caught in uncaughtException event:->>', err);
//     process.exit(1);
// });

// try {
//   process.nextTick(function() {
//       fs.readFile('non_existent.js', (err, str) => {
//           if(err) throw err;
//           else console.log(str);
//       });
//   });
// } catch(e) {
//   console.error('Error caught by catch block:', e);
// }

const domain = require('domain');
const d = domain.create();

d.on('error', (err) => {
  console.log('err2', err.message);
  console.log(needSend.message);
});

const needSend = { message: '需要传递给错误处理的一些信息' };
d.add(needSend);

function excute() {
  try {
    setTimeout(()=>{
      throw new Error('错误信息');
    });
  } catch (e) {
    console.error('error is:', e.message);
  }
};

d.run(excute);