// bubbleSort.js
const swap = require('./swap');

const bubbleSort = (input) => {
    let swapCount = 0;
    let swapping = true;

    while (swapping) {
        swapping = false;
        for (let i = 0; i < input.length - 1; i++) {
            if (input[i] > input[i + 1]) {
                swap(input, i, i + 1);
                swapCount++;
                swapping = true;
            }
        }
    }
    return input;
};
module.exports = bubbleSort;
// ----------------- START: example -----------------
// Reverse-sorted array:
bubbleSort([9, 8, 7, 6, 5, 4, 3, 2, 1]);
// Sorted array:
bubbleSort([1, 2, 3, 4, 5, 6, 7, 8, 9]);
// ----------------- END: example -----------------
// swap.js
const swap = (arr, indexOne, indexTwo) => {
    const temp = arr[indexTwo];
    arr[indexTwo] = arr[indexOne];
    arr[indexOne] = temp;
};
module.exports = swap;
