const crypto = require('crypto');

process.on('message', (e) => handleParentMsg(e));

function handleParentMsg(e) {
  for (let i = e.start; i < e.end; i++) {
    const hash = crypto.createHash('md5').update(String(i)).digest('hex');
    if (hash === e.hash) process.send(i);
  }
}
