// script.js
const { quicksort, partition } = require('./quicksort');

const randomize = () => Math.floor(Math.random() * 40);

let numbers = [];

for (let i = 0; i < 5; i++) {
    numbers.push(randomize());
}

console.log('Before quicksort:', numbers);
const sorted = quicksort(numbers);
console.log('After  quicksort:', sorted);

// quicksort.js - Recursive implementation
const swap = require('./swap');

const quicksort = (array, leftBound = 0, rightBound = array.length - 1) => {
    if (leftBound < rightBound) {
        const pivotIndex = partition(array, leftBound, rightBound);
        quicksort(array, leftBound, pivotIndex - 1);
        quicksort(array, pivotIndex, rightBound);
    }
    return array;
};

const partition = (array, leftIndex, rightIndex) => {
    const pivot = array[Math.floor((rightIndex + leftIndex) / 2)];
    while (leftIndex <= rightIndex) {
        while (array[leftIndex] < pivot) {
            leftIndex++;
        }
        while (array[rightIndex] > pivot) {
            rightIndex--;
        }
        if (leftIndex <= rightIndex) {
            swap(array, leftIndex, rightIndex);
            leftIndex++;
            rightIndex--;
        }
    }
    return leftIndex;
};

module.exports = {
    quicksort,
    partition,
};

//swap.js
const swap = (arr, indexOne, indexTwo) => {
    const temp = arr[indexTwo];
    arr[indexTwo] = arr[indexOne];
    arr[indexOne] = temp;
};

module.exports = swap;
