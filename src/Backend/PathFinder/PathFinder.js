<<<<<<< HEAD
import { Node } from "./Node";
export const CalculatePath = (productsId) => {
  const completeGraph = getGraph();
  console.log(completeGraph);
  //   let floydWarshallMatrix = initFloydWarshallMatrix(completeGraph);
  //   fillFloydWarshallMatrix(floydWarshallMatrix);
  //   const shortestProductsPath = calculateShortestProductsPath(
  //     floydWarshallMatrix.distance,
  //     productsId
  //   );
};

const getGraph = () => {
  const graphJson = require("./matrix.json");
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
    });
  });
  return { nodes: nodes, edges: edges };
};

const initFloydWarshallMatrix = (graph) => {
  let nodeNum = graph.nodes.length;
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
  const beginProductId = 8;
  const endProductId = 10;
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
  console.log(pathFromStart);
  console.log(pathFromEnd);
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
  visitedProducts.add(nearestNeighbor);
  productsPath.push(nearestNeighbor);
};
=======
export const CalculatePath = (products_id) => {
  sparseGraph = getGraph();
  graph = getSquashedGraph(sparseGraph, products_id);
  distancesMatrix = getDistanceMatrix(graph, products_id); //floyd-warshall
  shortestPathVerticesList = getShortestPath();
  fullPath = convertSquashedPathToFullPath(
    shortestPathVerticesList,
    sparseGraph
  );
  return fullPath;
};

const getGraph = () => {};
>>>>>>> 647ef9e (general skeleton of backend)
