import { origin, destiny } from "./breakpoints.js";

const getInitialWeights = (graph) => Object.assign({ destiny: Infinity }, graph[origin]);

const getInitialParents = (graph) => {
    const parents = { [destiny]: null };
    for (let child in graph[origin]) {
        parents[child] = origin;
    }
    return parents;
}

const findLowestWeightNode = (weights, processed) => {
    const knownNodes = Object.keys(weights)

    const lowestWeightNode = knownNodes.reduce((lowest, node) => {
        if (lowest === null && !processed.includes(node)) {
            lowest = node;
        }
        if (weights[node] < weights[lowest] && !processed.includes(node)) {
            lowest = node;
        }
        return lowest;
    }, null);

    return lowestWeightNode
};

export { getInitialWeights, getInitialParents, findLowestWeightNode }