import { Node } from "./Node";
export const CalculatePath = (productsId) => {
  const completeGraph = getGraph();
<<<<<<< HEAD
  //   console.log(completeGraph);
  let floydWarshallMatrix = initFloydWarshallMatrix(completeGraph);
  fillFloydWarshallMatrix(floydWarshallMatrix);
  console.log(floydWarshallMatrix);
  const shortestProductsPath = calculateShortestProductsPath(
    floydWarshallMatrix.distance,
    productsId
  );
  console.log(reconstructPath(shortestProductsPath, floydWarshallMatrix));
=======
  console.log(completeGraph);
  //   let floydWarshallMatrix = initFloydWarshallMatrix(completeGraph);
  //   fillFloydWarshallMatrix(floydWarshallMatrix);
  //   const shortestProductsPath = calculateShortestProductsPath(
  //     floydWarshallMatrix.distance,
  //     productsId
  //   );
>>>>>>> b7f3e0f1009ce64b393efc65aa70e9c951745ad1
};

const getGraph = () => {
  const graphJson = require("./matrix.json");
<<<<<<< HEAD
  let nodes = new Map();
  let edges = [];

  graphJson.graph.nodes.forEach((nodeObj) =>
    nodes.set(nodeObj.id, new Node(nodeObj.id))
  );
  graphJson.graph.nodes.forEach((nodeObj) => {
    nodeObj.adjacent.forEach((nodeId) => {
      let nodeA = nodes.get(nodeObj.id);
      let nodeB = nodes.get(nodeId);
      edges.push([nodeA, nodeB]);
      nodeA.addAdjacent(nodeB);
=======
  console.log(graphJson);
  let nodes = [];
  let edges = [];

  graphJson.graph.nodes.forEach((nodeObj) => nodes.push(new Node(nodeObj.id)));
  graphJson.graph.nodes.forEach((nodeObj) => {
    nodeObj.adjacent.forEach((edge) => {
      let nodeA = nodes[edge[0]];
      let nodeB = nodes[edge[1]];
      edges.push([nodeA, nodeB]);
      nodeA.addAdjacent(nodeB);
      nodeB.addAdjacent(nodeA);
>>>>>>> b7f3e0f1009ce64b393efc65aa70e9c951745ad1
    });
  });
  return { nodes: nodes, edges: edges };
};

const initFloydWarshallMatrix = (graph) => {
<<<<<<< HEAD
  let nodeNum = Math.max(...graph.nodes.keys()) + 1;
=======
  let nodeNum = graph.nodes.length;
>>>>>>> b7f3e0f1009ce64b393efc65aa70e9c951745ad1
  let distanceMatrix = [...Array(nodeNum)].map((x) =>
    Array(nodeNum).fill(Infinity)
  );
  let nextMatrix = [...Array(nodeNum)].map((x) => Array(nodeNum).fill(null));
  graph.nodes.forEach((node) => {
    const curId = node.id;
    distanceMatrix[curId][curId] = 0;
    nextMatrix[curId][curId] = node.id;
  });
  graph.edges.forEach((edge) => {
    const nodeA = edge[0];
    const nodeAId = nodeA.id;
    const nodeB = edge[1];
    const nodeBId = nodeB.id;
    distanceMatrix[nodeAId][nodeBId] = 1;
    distanceMatrix[nodeBId][nodeAId] = 1;
    nextMatrix[nodeAId][nodeBId] = nodeBId;
    nextMatrix[nodeBId][nodeAId] = nodeAId;
  });
  return { distance: distanceMatrix, nextNode: nextMatrix };
};

const fillFloydWarshallMatrix = (matrices) => {
  const n = matrices.distance.length;
  let distanceMatrix = matrices.distance;
  let nextMatrix = matrices.nextNode;
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (
          distanceMatrix[i][j] >
          distanceMatrix[i][k] + distanceMatrix[k][j]
        ) {
          distanceMatrix[i][j] = distanceMatrix[i][k] + distanceMatrix[k][j];
          nextMatrix[i][j] = nextMatrix[i][k];
        }
      }
    }
  }
};

const calculateShortestProductsPath = (distanceMatrix, productsId) => {
<<<<<<< HEAD
  const beginProductId = 0;
  const endProductId = 9;
=======
  const beginProductId = 8;
  const endProductId = 10;
>>>>>>> b7f3e0f1009ce64b393efc65aa70e9c951745ad1
  let visitedProducts = new Set();
  let pathFromStart = [beginProductId];
  let pathFromEnd = [endProductId];

  while (pathFromEnd.length + pathFromStart.length < productsId.length + 2) {
    addClosestProductToPath(
      pathFromStart,
      productsId,
      visitedProducts,
      distanceMatrix
    );
    addClosestProductToPath(
      pathFromEnd,
      productsId,
      visitedProducts,
      distanceMatrix
    );
  }
<<<<<<< HEAD
  return pathFromStart.concat(pathFromEnd.reverse());
=======
  console.log(pathFromStart);
  console.log(pathFromEnd);
>>>>>>> b7f3e0f1009ce64b393efc65aa70e9c951745ad1
};

const addClosestProductToPath = (
  productsPath,
  allProducts,
  visitedProducts,
  distanceMatrix
) => {
  let minDistance = Infinity;
  let nearestNeighbor = null;
  let curProductID = productsPath.at(-1);
  for (const product of allProducts) {
    if (visitedProducts.has(product)) {
      continue;
    }
    if (distanceMatrix[curProductID][product] < minDistance) {
      minDistance = distanceMatrix[curProductID][product];
      nearestNeighbor = product;
    }
  }
<<<<<<< HEAD
  if (nearestNeighbor === null) {
    return;
  }
  visitedProducts.add(nearestNeighbor);
  productsPath.push(nearestNeighbor);
};

const reconstructPath = (path, floydWarshallMatrix) => {
  const nextMatrix = floydWarshallMatrix.nextNode;
  let finalPath = [];
  for (let i = 0; i < path.length - 1; i++) {
    finalPath = finalPath.concat(
      getShortestPathBetween(path[i], path[i + 1], nextMatrix)
    );
  }
  return finalPath;
};

const getShortestPathBetween = (nodeA, nodeB, nextMatrix) => {
  let path = [nodeA];
  let curNode = nodeA;
  while (curNode != nodeB) {
    curNode = nextMatrix[curNode][nodeB];
    path.push(curNode);
  }
  return path;
};
=======
  visitedProducts.add(nearestNeighbor);
  productsPath.push(nearestNeighbor);
};
>>>>>>> b7f3e0f1009ce64b393efc65aa70e9c951745ad1
