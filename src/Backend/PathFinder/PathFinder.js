import { Node } from "./Node";
import { PriorityQueue } from "./PriorityQueue";
const H = 33;
const W = 23;
export const CalculatePath = (productsId) => {
  const completeGraph = getGraph();
  const productsPath = calculateShortestProductsPath(
    productsId,
    chebychevDistance
  );
  return getFullPath(productsPath, completeGraph);
};

const getFullPath = (productsPath, completeGraph) => {
  let totalPath = [];
  for (let i = 0; i < productsPath.length - 1; i++) {
    let curPairPath = aStarSearch(
      productsPath[i],
      productsPath[i + 1],
      completeGraph
    ).reverse();
    curPairPath.shift();
    totalPath = totalPath.concat(curPairPath);
  }
  totalPath.unshift(0);
  return totalPath;
};

const aStarSearch = (startNodeId, goalNodeId, graph) => {
  let explored = new Set();
  let cost = new Map();
  let priorityMap = new Map();
  cost.set(startNodeId, 0);
  let openSet = new PriorityQueue(
    (a, b) => priorityMap.get(a) < priorityMap.get(b)
  );
  let cameFrom = new Map();
  cameFrom.set(startNodeId, null);
  openSet.push(startNodeId);

  while (!openSet.isEmpty()) {
    let current = openSet.pop();
    if (!explored.has(current)) {
      explored.add(current);

      if (current == goalNodeId) {
        return reconstructPath(cameFrom, goalNodeId);
      }
      graph.nodes.get(current).adjacents.forEach((nodeObj) => {
        let successor = nodeObj.id;
        let successorCurrentCost = cost.get(current) + 1;
        if (
          !cost.has(successor) |
          (cost.get(successor) > successorCurrentCost)
        ) {
          cost.set(successor, successorCurrentCost);
          let priority =
            chebychevDistance(successor, goalNodeId) + successorCurrentCost;
          priorityMap.set(successor, priority);
          openSet.push(successor);
          cameFrom.set(successor, current);
        }
      });
    }
  }
};

const reconstructPath = (camFrom, goal) => {
  let path = [];
  let cur = goal;
  while (cur != null) {
    path.push(cur);
    cur = camFrom.get(cur);
  }
  return path;
};

const chebychevDistance = (nodeId, goalId) => {
  const cordNode = idToXandY(nodeId);
  const cordGoal = idToXandY(goalId);
  return Math.max(
    Math.abs(cordNode.x - cordGoal.x),
    Math.abs(cordNode.y - cordGoal.y)
  );
};

const idToXandY = (id) => {
  let y = Math.floor(id / W);
  let x = id % W;
  return { y: y, x: x };
};

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

const calculateShortestProductsPath = (productsId, distanceMetric) => {
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
      distanceMetric
    );
    addClosestProductToPath(
      pathFromEnd,
      productsId,
      visitedProducts,
      distanceMetric
    );
  }
  return pathFromStart.concat(pathFromEnd.reverse());
};

const addClosestProductToPath = (
  productsPath,
  allProducts,
  visitedProducts,
  distanceMetric
) => {
  let minDistance = Infinity;
  let nearestNeighbor = null;
  let curProductID = productsPath.at(-1);
  for (const product of allProducts) {
    if (visitedProducts.has(product)) {
      continue;
    }
    if (distanceMetric(curProductID, product) < minDistance) {
      minDistance = distanceMetric(curProductID, product);
      nearestNeighbor = product;
    }
  }
  if (nearestNeighbor === null) {
    return;
  }
  visitedProducts.add(nearestNeighbor);
  productsPath.push(nearestNeighbor);
};
