class HashMap {
    constructor(size = 0) {
        this.hashmap = new Array(size).fill(null).map(() => new LinkedList()); // Collisions: separate chaining.   Instead of an empty array, new hash maps will have an internal array filled with empty linked lists.
    }
    hash(key) {
        // Hashing
        let hashCode = 0;
        for (let i = 0; i < key.length; i++) {
            hashCode += hashCode + key.charCodeAt(i);
        }
        hashCode = hashCode % this.hashmap.length; // Compression
        return hashCode;
    }
    assign(key, value) {
        // Assign
        const arrayIndex = this.hash(key);
        // this.hashmap[arrayIndex] = value;                // without Collisions.
        const linkedList = this.hashmap[arrayIndex]; // Collisions: Assigning (separate chaining)
        if (linkedList.head === null) {
            linkedList.addToHead({ key, value });
            return;
        }
        let current = linkedList.head; // Collisions: Looping (separate chaining)
        while (current) {
            if (current.data.key === key) {
                current.data = { key, value };
            }
            if (!current.getNextNode()) {
                const newNode = new Node({ key, value });
                current.setNextNode(newNode);
                break;
            }
            current = current.getNextNode();
        }
    }
    retrieve(key) {
        // Retrieve
        const arrayIndex = this.hash(key);
        // return this.hashmap[arrayIndex];                 // without Collisions.
        let current = this.hashmap[arrayIndex].head; // Collisions: Retrieving
        while (current) {
            if (current.data.key === key) {
                return current.data.value;
            }
            current = current.next;
        }
        return null;
    }
}
// ----------------- START: example -----------------
let myHashMap = new HashMap(3);
console.log(myHashMap.hash('id'));
console.log(myHashMap.hash('id'));

const employees = new HashMap(3);
employees.assign('34-567', 'Mara');
console.log(employees.hashmap);

const glossary = new HashMap(3);
glossary.assign('semordnilap', 'Words that form different words when reversed');
console.log(glossary.retrieve('semordnilap'));

const parkInventory = new HashMap(2); // -> Collisions
parkInventory.assign('reed', 'marsh plant');
parkInventory.assign('deer', 'forest animal');
// ----------------- END: example -----------------
module.exports = HashMap;
