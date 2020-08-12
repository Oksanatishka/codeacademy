class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
    // Methods
    setNextNode(node) {
        // this.next = node;

        // Node Validation
        if (node instanceof Node || node === null) {
            this.next = node;
        } else {
            throw new Error('Next node must be a member of the Node class.');
        }
    }
    getNextNode() {
        return this.next;
    }
}

// ----------------- START: example -----------------
const firstNode = new Node('I am an instance of a Node!');
// const secondNode = new Node('hi');
// firstNode.setNextNode(secondNode);
firstNode.setNextNode(5); // Error: Next node must be a member of the Node class.
// console.log(firstNode);
// console.log(secondNode);
console.log(firstNode.getNextNode());
// ----------------- END: example -----------------

module.exports = Node;
