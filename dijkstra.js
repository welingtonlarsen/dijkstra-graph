import { origin, destiny } from "./breakpoints.js";
import { getInitialWeights, getInitialParents, findLowestWeightNode } from "./graph-utils.js"

// Graph with distances between cities
const graph = {
    Joinville: { Blumenau: 117, Penha: 73 },
    Penha: { Joinville: 73, Itajai: 25, Blumenau: 57 },
    Blumenau: { Joinville: 117, Penha: 57, Brusque: 45, Itajai: 58 },
    Itajai: { Penha: 25, Blumenau: 58, Camboriu: 17 },
    Brusque: { Blumenau: 43, Tijucas: 50, Criciuma: 400 },
    Camboriu: { Itajai: 17, Tijucas: 33 },
    Tijucas: { Camboriu: 33, Brusque: 50, Sao_Jose: 39 },
    Criciuma: { Sao_Jose: 193, Brusque: 400 },
    Sao_Jose: { Tijucas: 39, Criciuma: 193, Florianopolis: 13 },
    Florianopolis: {}
};

const weights = getInitialWeights(graph)
const parents = getInitialParents(graph)
const processedNodes = [];

let node = findLowestWeightNode(weights, processedNodes)

// Calculate the minimun distance to arrive in each node (city)
while (node) {
    let weightToNode = weights[node];
    let nodeChildren = graph[node];

    for (let chield in nodeChildren) {
        let newWeightToArriveInChield = weightToNode + nodeChildren[chield];
        if (!weights[chield] || weights[chield] > newWeightToArriveInChield) {
            weights[chield] = newWeightToArriveInChield;
            parents[chield] = node;
        }
    }

    processedNodes.push(node);
    node = findLowestWeightNode(weights, processedNodes);
}

// Organize the paths to arrive on final destiny
let optimalPath = [destiny];
let parent = parents[destiny];
while (parent) {
    optimalPath.unshift(parent);
    parent = parents[parent];
    if(parent === origin){
        optimalPath.unshift(parent)
        break;
    } 
}

const results = {
    distance: `${weights[destiny]} km`,
    path: optimalPath
};

console.log(results)