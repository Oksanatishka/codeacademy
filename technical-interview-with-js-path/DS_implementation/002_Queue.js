const LinkedList = require('./LinkedList');

class Queue {
    constructor(maxSize = Infinity) {
        this.queue = new LinkedList();
        this.size = 0;
        this.maxSize = maxSize; // unbounded queue
    }
    // hasRoom() and isEmpty() methods for Bounded Queues
    hasRoom() {
        // used later to Avoid Overflow
        return this.size < this.maxSize;
    }
    isEmpty() {
        // used later to Avoid Underflow
        return this.size === 0;
    }
    enqueue(data) {
        if (this.hasRoom()) {
            // Avoiding Overflow
            this.queue.addToTail(data);
            this.size++;
            // console.log(`Added ${data} to queue! Queue size is now ${this.size}.`);
        } else {
            throw new Error('Queue is full!');
        }
    }
    dequeue() {
        if (!this.isEmpty()) {
            // Avoiding Underflow
            const data = this.queue.removeHead();
            this.size--;
            // console.log(`Removed ${data} from queue! Queue size is now ${this.size}.`);
            return data;
        } else {
            throw new Error('Queue is empty!');
        }
    }
}

// ----------------- START: example -----------------
const restaurantOrders = new Queue();
console.log(`restaurantOrders has ${restaurantOrders.size} nodes`);

restaurantOrder.enqueue('apple pie');
restaurantOrder.enqueue('roast chicken');
restaurantOrder.enqueue('quinoa salad');

console.log('\nFood preparing...\n');
restaurantOrder.dequeue();
restaurantOrder.dequeue();
restaurantOrder.dequeue();
console.log('All orders ready!');
// ----------------- END: example -----------------
module.exports = Queue;

// Real life example: checkout line at a supermarket
