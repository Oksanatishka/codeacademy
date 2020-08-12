// Vertex.js
const Edge = require('./Edge.js');

class Vertex {
    constructor(data) {
        this.data = data;
        this.edges = [];
    }

    addEdge(vertex, weight) {
        // Connecting Vertices with Edges
        if (vertex instanceof Vertex) {
            this.edges.push(new Edge(this, vertex, weight));
        } else {
            throw new Error('Edge start and end must both be Vertex');
        }
    }
    removeEdge(vertex) {
        // Removing Vertex Connections
        this.edges = this.edges.filter((edge) => edge.end !== vertex);
    }

    print() {
        const edgeList =
            this.edges.map((edge) =>
                edge.weight !== null ? `${edge.end.data} (${edge.weight})` : edge.end.data
            ) || [];

        const output = `${this.data} --> ${edgeList.join(', ')}`;
        console.log(output);
    }
}

module.exports = Vertex;

//Graph.js
const Edge = require('./Edge.js');
const Vertex = require('./Vertex.js');

class Graph {
    constructor(isWeighted = false, isDirected = false) {
        this.vertices = [];
        this.isWeighted = isWeighted; // Weighted Graphs
        this.isDirected = isDirected; // Directed Graphs
    }

    addVertex(data) {
        // Adding Vertices
        const newVertex = new Vertex(data);
        this.vertices.push(newVertex);

        return newVertex;
    }

    removeVertex(vertex) {
        // Removing Vertices
        this.vertices = this.vertices.filter((v) => v !== vertex);
    }

    addEdge(vertexOne, vertexTwo, weight) {
        // Connecting Vertices with Edges
        const edgeWeight = this.isWeighted ? weight : null; // Weighted Graphs

        if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
            vertexOne.addEdge(vertexTwo, edgeWeight);
            if (!this.isDirected) {
                // Directed Graphs
                vertexTwo.addEdge(vertexOne, edgeWeight);
            }
        } else {
            throw new Error('Expected Vertex arguments.');
        }
    }

    removeEdge(vertexOne, vertexTwo) {
        if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
            vertexOne.removeEdge(vertexTwo);
            if (!this.isDirected) {
                // Directed Graphs
                vertexTwo.removeEdge(vertexOne);
            }
        } else {
            throw new Error('Expected Vertex arguments.');
        }
    }

    print() {
        // this.vertices.forEach((vertex) => vertex.print());
        const vertexList = this.vertices || [];
        vertexList.forEach((vertex) => vertex.print());
    }
}
// ----------------- START: example -----------------
const trainNetwork = new Graph();
const atlantaStation = trainNetwork.addVertex('Atlanta');
const newYorkStation = trainNetwork.addVertex('New York');
// trainNetwork.removeVertex(atlantaStation);
trainNetwork.addEdge(atlantaStation, newYorkStation, 800);
trainNetwork.removeEdge(atlantaStation, newYorkStation);
trainNetwork.print();
// ----------------- END: example -----------------
module.exports = Graph;

// Edge.js
class Edge {
    constructor(start, end, weight = null) {
        this.start = start;
        this.end = end;
        this.weight = weight;
    }
}

module.exports = Edge;

// ------------------ Traversal techniques ------------------
// ------------------ > DFS - (First layer) ------------------
// depthFirstTraversal.js
const testGraph = require('./testGraph.js');

const depthFirstTraversal = (start, visitedVertices = [start]) => {
    console.log(start.data);

    if (start.edges.length) {
        const neighbor = start.edges[0].end;
        if (!visitedVertices.includes(neighbor)) {
            visitedVertices.push(neighbor);
            depthFirstTraversal(neighbor, visitedVertices);
        }
    }
    // > DFS - (All paths)) // below code instead of above 'if'
    // start.edges.forEach((edge) => {
    //     const neighbor = edge.end;
    //     ... // the same inner if
    // });
};
depthFirstTraversal(testGraph.vertices[0]);

// ------------------ > DFS (Callbacks) ------------------
// const depthFirstTraversal = (start, callback, visitedVertices = [start]) => {
//     callback(start);

//     start.edges.forEach((edge) => {
//         const neighbor = edge.end;

//         if (!visitedVertices.includes(neighbor)) {
//             visitedVertices.push(neighbor);
//             depthFirstTraversal(neighbor, callback, visitedVertices);
//         }
//     });
// };

// depthFirstTraversal(testGraph.vertices[0], (vertex) => {
//     console.log(vertex.data);
// });

// testGraph.js - for DFS & BFS
const { Graph } = require('./Graph.js');

const simpleGraph = new Graph(true, false);
const startNode = simpleGraph.addVertex('v0.0.0');
const v1 = simpleGraph.addVertex('v1.0.0');
const v2 = simpleGraph.addVertex('v2.0.0');

const v11 = simpleGraph.addVertex('v1.1.0');
const v12 = simpleGraph.addVertex('v1.2.0');
const v21 = simpleGraph.addVertex('v2.1.0');

const v111 = simpleGraph.addVertex('v1.1.1');
const v112 = simpleGraph.addVertex('v1.1.2');
const v121 = simpleGraph.addVertex('v1.2.1');
const v211 = simpleGraph.addVertex('v2.1.1');

simpleGraph.addEdge(startNode, v1);
simpleGraph.addEdge(startNode, v2);

simpleGraph.addEdge(v1, v11);
simpleGraph.addEdge(v1, v12);
simpleGraph.addEdge(v2, v21);

simpleGraph.addEdge(v11, v111);
simpleGraph.addEdge(v11, v112);
simpleGraph.addEdge(v12, v121);
simpleGraph.addEdge(v21, v211);

module.exports = simpleGraph;

// ------------------ > BFS - (First layer) ------------------
// breadthFirstTraversal.js
const testGraph = require('./testGraph.js');

const breadthFirstTraversal = (start) => {
    const visitedVertices = [start];
    start.edges.forEach((edge) => {
        const neighbor = edge.end;
        if (!visitedVertices.includes(neighbor)) {
            visitedVertices.push(neighbor);
        }
    });
    console.log(visitedVertices);
};

breadthFirstTraversal(testGraph.vertices[0]);

// testGraph.js - same as before

// ------------------ > BFS - (All layers) ------------------
// breadthFirstTraversal.js
const testGraph = require('./testGraph.js');
const Queue = require('./Queue.js');

const breadthFirstTraversal = (start) => {
    const visitedVertices = [start];
    const visitQueue = new Queue();
    visitQueue.enqueue(start);
    while (!visitQueue.isEmpty()) {
        const current = visitQueue.dequeue();
        console.log(current.data);
        current.edges.forEach((edge) => {
            const neighbor = edge.end;
            if (!visitedVertices.includes(neighbor)) {
                visitedVertices.push(neighbor);
                visitQueue.enqueue(neighbor);
            }
        });
    }
};
breadthFirstTraversal(testGraph.vertices[0]);

// ------------------ > Dijkstras Algorithm ------------------

// dijkstras.js
const testGraph = require('./testGraph.js');

const dijkstras = (graph, startingVertex) => {
    const distances = {};
    const previous = {};

    graph.vertices.forEach((vertex) => {
        distances[vertex.data] = Infinity;
        previous[vertex.data] = null;
    });

    distances[startingVertex.data] = 0;

    // [code rows 244-254] - To Evaluate Paths to Starting Vertex’s Neighbors
    const vertex = startingVertex;
    vertex.edges.forEach((edge) => {
        const alternate = edge.weight + distances[vertex.data];
        const neighborValue = edge.end.data;

        if (alternate < distances[neighborValue]) {
            distances[neighborValue] = alternate;
            previous[neighborValue] = vertex;
        }
    });

    return { distances, previous };
};

const results = dijkstras(testGraph, testGraph.vertices[0]);
console.log(results);

module.exports = dijkstras;

// testGraph.js
const { Graph } = require('./Graph.js');

const testGraph = new Graph(true, true);
const a = testGraph.addVertex('A');
const b = testGraph.addVertex('B');
const c = testGraph.addVertex('C');
const d = testGraph.addVertex('D');
const e = testGraph.addVertex('E');
const f = testGraph.addVertex('F');
const g = testGraph.addVertex('G');

testGraph.addEdge(a, c, 100);
testGraph.addEdge(a, b, 3);
testGraph.addEdge(a, d, 4);
testGraph.addEdge(d, c, 3);
testGraph.addEdge(d, e, 8);
testGraph.addEdge(e, b, -2);
testGraph.addEdge(e, f, 10);
testGraph.addEdge(b, g, 9);
testGraph.addEdge(e, g, -50);

module.exports = testGraph;

// ------------------ > Dijkstras Algorithm  - Evaluate All Paths ------------------
// dijkstras.js
const PriorityQueue = require('./PriorityQueue.js');
const testGraph = require('./testGraph.js');

const dijkstras = (graph, startingVertex) => {
    const distances = {};
    const previous = {};
    const queue = new PriorityQueue();

    queue.add({ vertex: startingVertex, priority: 0 });

    graph.vertices.forEach((vertex) => {
        distances[vertex.data] = Infinity;
        previous[vertex.data] = null;
    });

    distances[startingVertex.data] = 0;

    while (!queue.isEmpty()) {
        const { vertex } = queue.popMin();

        vertex.edges.forEach((edge) => {
            const alternate = edge.weight + distances[vertex.data];
            const neighborValue = edge.end.data;

            if (alternate < distances[neighborValue]) {
                distances[neighborValue] = alternate;
                previous[neighborValue] = vertex;

                queue.add({ vertex: edge.end, priority: distances[neighborValue] });
            }
        });
    }

    return { distances, previous };
};

const results = dijkstras(testGraph, testGraph.vertices[0]);
console.log(results);

module.exports = dijkstras;

// testGraph.js         - the same
// PriorityQueueu.js    - the same DS
//MinHeap.js            - the same DS

// ------------------ > Dijkstras Algorithm  - Shortest Path to a Target Vertex ------------------
// dijkstras.js     - the same
// testGraph.js     - the same

// shortestPath.js
const testGraph = require('./testGraph.js');
const dijkstras = require('./dijkstras.js');

const shortestPathBetween = (graph, startingVertex, targetVertex) => {
    const { distances, previous } = dijkstras(graph, startingVertex);

    const distance = distances[targetVertex.data];
    const path = [];

    let vertex = targetVertex;
    while (vertex) {
        path.unshift(vertex);
        vertex = previous[vertex.data];
    }

    return { distance, path };
};

// Retrieve shortest path between vertices A and G
const a = testGraph.getVertexByValue('A');
const g = testGraph.getVertexByValue('G');
const results = shortestPathBetween(testGraph, a, g);
console.log(results);

module.exports = shortestPathBetween;
