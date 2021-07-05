const cluster = require('cluster');
const os = require('os');
const http = require('http');
const domain = require('domain');

const d = domain.create();

if (cluster.isMaster) {
  const cpuNum = os.cpus().length;
  console.log('cpuNum', cpuNum)
  for (let i = 0; i < cpuNum; ++i) {
    cluster.fork()
  };
  // fork work log
  cluster.on('fork', worker=>{
    console.info(`${new Date()} worker${worker.process.pid}进程启动成功`);
  });
  // 监听异常退出进程，并重新fork
  cluster.on('exit',(worker,code,signal)=>{
    console.info(`${new Date()} worker${worker.process.pid}进程启动异常退出`);
    cluster.fork();
  })
} else {
  http.createServer((req, res)=>{
    d.add(res);
    d.on('error', (err) => {
      console.log('记录的err信息', err.message);
      console.log('出错的 work id:', process.pid);
      // uploadError(err)  // 上报错误信息至监控
      res.end('服务器异常, 请稍后再试');
      // 将异常子进程杀死
      cluster.worker.kill(process.pid);
    });
    d.run(handle.bind(null, req, res));
  }).listen(8080);
}

function handle(req, res) {
  if (process.pid % 2 === 0) {
    throw new Error(`出错了`);
  }
  res.end(`response by worker: ${process.pid}`);
};

// 24388 24389 24350 24351 