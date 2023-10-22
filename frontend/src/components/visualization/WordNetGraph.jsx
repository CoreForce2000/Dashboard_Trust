import React, { useEffect } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import { baseUrl } from '../../config';

let node_list = await fetch(`${baseUrl}/posts/wordnet`).then(resp => resp.json());


function WordNetGraph() {
  useEffect(() => {
    // Define your nodes

    console.log(node_list)

    node_list.forEach((node, i) => {      
      node.value = node.value / 10;
      // node.weight = node.value;

    })

    const nodes = new DataSet(
      node_list
    );

    // Define your edges with weights
    const edges = new DataSet([
      { from: 1, to: 2, value: 1, label: 'weight: 5' },
      // Add more edges here with a value property as the weight
    ]);


    // Provide the data in the vis network format
    const data = {
      nodes: nodes,
      edges: edges,
    };

    const options = {
      layout: {
        hierarchical: false,
      },
      nodes: {
        shape: "dot",
        scaling: {
          min: 10,
          max: 30,
          label: {
            min: 8,
            max: 30,
            drawThreshold: 12,
            maxVisible: 20,
          },
        },
        font: {
          size: 12,
          face: "Tahoma",
        },
      },
      edges: {
        color: '#000000',
        font: {
          size: 12, // Setting font size for the label (weight)
        },
        scaling:{
          min:1,
          max:15
        },
      },
      physics: {
        stabilization: false,
        barnesHat: {
          gravitationalConstant: 10,
          springConstant: 0.5, // Increase spring constant
          centralGravity: 0.9,
          springLength: 1, // Decrease spring length
        },
      },
      interaction: { dragNodes: true },
    };
    
    

    // Get the div from the DOM and instantiate the network
    const network = new Network(document.getElementById('network'), data, options);

    return () => {
      network.destroy();
    };
  }, []);

  return <div id="network" style={{ width: '800px', height: '800px' }}></div>;
}

export default WordNetGraph;
