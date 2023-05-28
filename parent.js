const cluster = require('cluster');
const os = require('os');

const hash = '16cf868a5020546dc8b3ba16b37dc3ff';
const maxNumber = 10_000_000;
const processesCount = os.cpus().length;
const numbersPerProcess = Math.round(maxNumber / processesCount);
const children = [];

console.log('hash:', hash);
console.time('cracked in');
let i = 0;
while (i < processesCount) {
  const child = cluster.fork();
  children.push(child);

  const start = i * numbersPerProcess;
  const end = ++i * numbersPerProcess;
  child.send({ start, end, hash });
  child.on('message', (e) => handleChildMsg(e));
}

function handleChildMsg(e) {
  console.log('----------------');
  console.log('cracked: ' + e);
  console.log('----------------');
  console.timeEnd('cracked in');
  children.forEach((c) => c.kill());
}
