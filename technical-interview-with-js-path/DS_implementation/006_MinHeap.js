//MinHeap.js
class MinHeap {
    constructor() {
        this.heap = [null];
        this.size = 0;
    }

    popMin() {
        if (this.size === 0) {
            return null;
        }
        // console.log(`\n.. Swap ${this.heap[1]} with last element ${this.heap[this.size]}`);
        this.swap(1, this.size);
        const min = this.heap.pop();
        this.size--;
        // console.log(`.. Removed ${min} from heap`);
        // console.log('..', this.heap);
        this.heapify();
        return min;
    }

    add(value) {
        // console.log(`.. adding ${value}`);
        this.heap.push(value);
        this.size++;
        this.bubbleUp();
        // console.log(`added ${value} to heap`, this.heap);
    }

    bubbleUp() {
        let current = this.size;
        while (current > 1 && this.heap[getParent(current)] > this.heap[current]) {
            // console.log(`.. swap ${this.heap[current]} with parent ${this.heap[getParent(current)]}`);
            this.swap(current, getParent(current));
            // console.log('..', this.heap);
            current = getParent(current);
        }
    }

    heapify() {
        let current = 1;
        let leftChild = getLeft(current);
        let rightChild = getRight(current);
        // Check that there is something to swap (only need to check the left if both exist)
        while (this.canSwap(current, leftChild, rightChild)) {
            // Only compare left & right if they both exist
            if (this.exists(leftChild) && this.exists(rightChild)) {
                // Make sure to swap with the smaller of the two children
                if (this.heap[leftChild] < this.heap[rightChild]) {
                    this.swap(current, leftChild);
                    current = leftChild;
                } else {
                    this.swap(current, rightChild);
                    current = rightChild;
                }
            } else {
                // If only one child exist, always swap with the left
                this.swap(current, leftChild);
                current = leftChild;
            }
            leftChild = getLeft(current);
            rightChild = getRight(current);
        }
    }

    exists(index) {
        return index <= this.size;
    }

    canSwap(current, leftChild, rightChild) {
        // Check that one of the possible swap conditions exists
        return (
            (this.exists(leftChild) && this.heap[current] > this.heap[leftChild]) ||
            (this.exists(rightChild) && this.heap[current] > this.heap[rightChild])
        );
    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }
    // size() {
    //     return this.heap.length;
    // }
}

const getParent = (current) => Math.floor(current / 2);
const getLeft = (current) => current * 2;
const getRight = (current) => current * 2 + 1;

// module.exports = MinHeap;
// ----------------- START: example -----------------

// script.js

// import MinHeap class
const MinHeap = require('./MinHeap');

// instantiate a MinHeap class
const minHeap = new MinHeap();

// helper function to return a random integer
function randomize() {
    return Math.floor(Math.random() * 40);
}

// populate minHeap with random numbers
for (let i = 0; i < 6; i++) {
    minHeap.add(randomize());
}

// display the bubbled up numbers in the heap
console.log('Bubbled Up', minHeap.heap);

// remove the minimum value from heap
for (let i = 0; i < 6; i++) {
    minHeap.popMin();
    console.log('Heapified', minHeap.heap);
}
// ----------------- END: example -----------------
