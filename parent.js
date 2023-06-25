const cluster = require('cluster');

const max = 100_000;
const arr = [];
for (let i = 0; i < max; i++) {
    arr.push(Math.round(Math.random() * max));
}

console.time('4 processes');

const processesCount = 4;
const processArrLen = max / processesCount;
const children = [];
const sortedArrs = [];
let finishedChildren = 0;

for (let i = 0, j = 0; i < max; i += processArrLen, j++) {
    const processArr = arr.slice(i, i + processArrLen);
    const child = cluster.fork();

    children.push(child);
    child.send({ arr: processArr, arrNum: j });
    child.on('message', (e) => handleChildMsg(e));
}

const handleChildMsg = (e) => {
    sortedArrs[e.arrNum] = e.sortedArr;
    finishedChildren++;

    if (finishedChildren == processesCount) {
        children.forEach((c) => c.kill());

        const sortedArr = [];
        sortedArrs.forEach((arr) => {
            sortedArr.push(...arr);
        });

        console.log(sortedArr);
        console.timeEnd('4 processes');
    }
};
