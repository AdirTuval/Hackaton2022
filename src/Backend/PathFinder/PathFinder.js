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
