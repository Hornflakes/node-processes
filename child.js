const { mergeSort } = require('./merge-sort');

process.on('message', (e) => {
    const sortedArr = mergeSort(e.arr);
    process.send({ sortedArr: sortedArr, arrNum: e.arrNum });
});
