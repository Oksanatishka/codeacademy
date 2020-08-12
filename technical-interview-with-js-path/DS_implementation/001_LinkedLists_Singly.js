const Node = require('./001_Node');

class LinkedList {
    constructor() {
        this.head = null;
    }
    addToHead(data) {
        const newHead = new Node(data);
        const currentHead = this.head;
        this.head = newHead;
        if (currentHead) {
            this.head.setNextNode(currentHead);
        }
    }
    addToTail(data) {
        let tail = this.head;
        if (!tail) {
            this.head = new Node(data);
        } else {
            while (tail.getNextNode()) {
                tail = tail.getNextNode();
            }
            tail.setNextNode(new Node(data));
        }
    }
    removeHead() {
        const removedHead = this.head;
        if (!removedHead) {
            return;
        }
        this.head = removedHead.getNextNode();
        return removedHead.data;
    }
    printList() {
        let currentNode = this.head;
        let output = '<head> ';
        while (currentNode !== null) {
            output += currentNode.data + ' ';
            currentNode = currentNode.getNextNode();
        }
        output += '<tail>';
        console.log(output);
    }
}

// ----------------- START: example ----------------- (To create an instance of that class and create a linked list of the seasons)
const seasons = new LinkedList();

seasons.printList();
seasons.addToHead('summer');
seasons.addToHead('spring');
seasons.printList();

seasons.addToTail('fall');
seasons.addToTail('winter');
seasons.printList();

seasons.removeHead();
seasons.printList();
// ----------------- END: example -----------------

module.exports = LinkedList;

// Real life example: Flight: Kyiv->Berlin->SF->null

// ===================================================================================
// ================== Challenges =====================================================
// ===================================================================================
// ------------------ Iterating techniques ------------------
// > 1. Two Ponters at different speed
const findMiddle = (linkedList) => {
    let fast = linkedList.head;
    let slow = linkedList.head;

    while (fast !== null) {
        // As long as the end of the list is not reached
        fast = fast.getNextNode(); // Move the fast pointer at least one step
        if (fast !== null) {
            // If it isn't at the end of the list
            fast = fast.getNextNode(); // Move both pointers forward once
            slow = slow.getNextNode();
        }
    }
    return slow; // At this point, the slow pointer is in the middle
};
// the same but half speed
const findMiddleAlternate = (linkedList) => {
    let count = 0;
    let fast = linkedList.head;
    let slow = linkedList.head;

    while (fast !== null) {
        fast = fast.getNextNode();
        if (count % 2 !== 0) {
            slow = slow.getNextNode();
        }
        count++;
    }
    return slow;
};

// > 2. Two Ponters in Parallel
const nthLastNode = (linkedList, n) => {
    let current = null;
    let tailSeeker = linkedList.head;
    let count = 0;
    while (tailSeeker) {
        tailSeeker = tailSeeker.next;
        if (count >= n) {
            if (!current) {
                current = linkedList.head;
            }
            current = current.next;
        }
        count++;
    }
    return current;
};

// > 3. Using Array
const arrayNthLast = (list, n) => {
    const linkedListArray = [];
    let currentNode = list.removeHead();
    while (currentNode) {
        linkedListArray.push(currentNode);
        currentNode = currentNode.getNextNode();
    }
    return list[list.length - n];
};
// ------------------ Recursion vs Iteration ------------------
findNodeRecursively(data, currentNode = this.head) {
    if (currentNode === null) {                 // Base case 2 – return null if the end of the linked list is reached.
        return null;
    } else if (currentNode.data === data) {     // Base case 1 – return the current node if it matches the data argument.
        return currentNode;
    } else {                                    // Recursive Case – return a call to .findNodeRecursively() with the next node as an argument.
        return this.findNodeRecursively(data, currentNode.next);
    }
}

findNodeIteratively(data) {                     // using an iterative approach
    let currentNode = this.head;
    while (currentNode !== null) {
        if (currentNode.data === data) {
            return currentNode;
        }
        currentNode = currentNode.next;
    }
    return null;
}
// ------------------  ------------------