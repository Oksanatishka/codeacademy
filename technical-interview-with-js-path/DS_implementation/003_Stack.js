// ----------------- Implementation using array (not efficient) -----------------
class Stack {
    constructor() {
        this._array = []; // In Stack, the array itself is stored as _array, so it’s a signal to other developers that to use the Stack as intended, they shouldn’t need to access it directly.
    }

    push(newValue) {
        this._array.push(newValue);
    }

    pop() {
        return this._array.pop();
    }
}
// ----------------- Implementation using Linked List -----------------
const LinkedList = require('./LinkedList');
class Stack {
    constructor(maxSize = Infinity) {
        this.stack = new LinkedList();
        this.size = 0; // Stacks Javascript Size
        this.maxSize = maxSize;
    }
    hasRoom() {
        return this.size < this.maxSize;
    }
    isEmpty() {
        return this.size === 0;
    }
    peek() {
        if (!this.isEmpty()) {
            return this.stack.head.data;
        } else {
            return null;
        }
    }
    push(value) {
        if (this.hasRoom()) {
            this.stack.addToHead(value);
            this.size++;
        } else {
            throw new Error('Stack is full');
        }
    }
    pop() {
        if (!this.isEmpty()) {
            const value = this.stack.removeHead();
            this.size--;
            return value;
        } else {
            throw new Error('Stack is empty!');
        }
    }
}
module.exports = Stack;
