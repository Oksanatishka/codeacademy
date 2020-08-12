class TreeNode {
    constructor(data) {
        this.data = data;
        this.children = []; // We will maintain the children of TreeNode as a JavaScript array. This will make it easier to add and remove a child.
    }
    addChild(child) {
        if (child instanceof TreeNode) {
            this.children.push(child);
        } else {
            this.children.push(new TreeNode(child));
        }
    }
    removeChild(childToRemove) {
        const length = this.children.length;
        this.children = this.children.filter((child) => {
            if (childToRemove instanceof TreeNode) {
                return childToRemove !== child;
            } else {
                return child.data !== childToRemove;
            }
        });
        if (length === this.children.length) {
            this.children.forEach((child) => child.removeChild(childToRemove));
        }
    }
    print(level = 0) {
        let result = '';
        for (let i = 0; i < level; i++) {
            result += '-- ';
        }
        console.log(`${result}${this.data}`);
        this.children.forEach((child) => child.print(level + 1));
    }
    depthFirstTraversal() {
        console.log(this.data);
        this.children.forEach((child) => child.depthFirstTraversal());
    }
    breadthFirstTraversal() {
        let queue = [this];
        while (queue.length > 0) {
            const current = queue.shift();
            console.log(current.data);
            queue = queue.concat(current.children);
        }
    }
}
// module.exports = TreeNode;

// ----------------- START: example -----------------
const TreeNode = require('./TreeNode');
const tree = new TreeNode(1); // instantiate your TreeNode class
console.log(tree); // display your TreeNode class

tree.addChild(15);
console.log(tree);
// const node = new TreeNode(30);
// tree.addChild(node);
tree.addChild(new TreeNode(30));
console.log(tree);

tree.removeChild(15);
console.log(tree);
tree.removeChild(node);
console.log(tree);
// ----------------- END: example -----------------
// Real-life example: family tree or a computer’s file system
