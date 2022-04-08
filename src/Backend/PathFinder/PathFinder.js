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
  //   console.log("here");
  //   console.log(reconstructPath(shortestProductsPath, floydWarshallMatrix));
};

// export const CalculatePath = (productsId) => {
//     const completeGraph = getGraph();
//     console.log(completeGraph);
//       let floydWarshallMatrix = initFloydWarshallMatrix(completeGraph);
//       fillFloydWarshallMatrix(floydWarshallMatrix);
//       const shortestProductsPath = calculateShortestProductsPath(
//         floydWarshallMatrix.distance,
//         productsId
//       );
//       console.log("here");
//       console.log(reconstructPath(shortestProductsPath, floydWarshallMatrix));
//   };

const getGraph = () => {
  const graphJson = require("./matrix.json");
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
    });
  });
  return { nodes: nodes, edges: edges };
};

const initFloydWarshallMatrix = (graph) => {
  let nodeNum = Math.max(...graph.nodes.keys()) + 1;
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
  const beginProductId = 0;
  const endProductId = 758;
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
  return pathFromStart.concat(pathFromEnd.reverse());
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
