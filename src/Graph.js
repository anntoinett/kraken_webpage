import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

const Graph = ({data_from_db}) => {

  console.log(data_from_db);


  const domNode = useRef(null);
  const network = useRef(null);

  var currFocusedNode=0;
  var highlightActive = false;

  const areaOfResearchColor = "#0b5865";
  const pubColor = "#1295aa";
  const memberColor = "#0d637c";

  const highlightColor = "#17d8d4";
  const edgesColor = "#a8b3be";
  const shadowColor = "#a8b3be";

  const areaShape = "dot";
  const pubShape = "dot";

  var descriptionElement = document.createElement("div");
  descriptionElement.style.border = "1px solid gray";
  descriptionElement.style.height = "30em";
  descriptionElement.style.width = "30em";
  var descriptionElementInner = document.createElement("div");
  descriptionElementInner.innerHTML = "Antoni Ligęza"
  descriptionElement.appendChild(descriptionElementInner);

  var nodeTypeColors = {"teamMember": memberColor, "kraken": pubColor, "publication": pubColor, "areaOfResearch": areaOfResearchColor};

  var memberNodes = [
    { id: 1, image: 'http://127.0.0.1:8887/AL.png', shape:'circularImage',size:30, label: 'Leader', hidden: true, nodeType: 'teamMember',color: {
      background: memberColor,
      border: edgesColor,
      // ,
      // fixed: {x: true}
  },
description: "Antoni Ligęza"},
    { id: 0, image: 'http://127.0.0.1:8887/logo_wyciete_new.png', shape:'image',size:70, label: '', nodeType: 'kraken', color: {
      background: memberColor,
      border: edgesColor
            
  }, description: "KRaKEn is a research group led by Professor Antoni Ligęza. It is composed mainly of scientists working in the Department of Applied Computer Science, Faculty of Electrical Engineering, Automatics, Computer Science and Biomedical Engineering, AGH University of Science and Technology, as well as doctoral students and team collaborators. Between 2009 and 2019, the members of the group cooperated within other teams and projects. The current composition and research profile of KRaKEn was established in 2019, after some of the group’s members returned to Poland upon completion of their doctorates and post-doctoral project abroad."},
    { id: 2, image: 'http://127.0.0.1:8887/KJ.png', shape:'circularImage',size:30, label: 'Member', hidden: true, nodeType: 'teamMember', color: {
      background: memberColor,
      border: edgesColor
  } ,
  description: "Krystian Jobczyk"},
    { id: 3, image: 'http://127.0.0.1:8887/WTA.png', shape:'circularImage',size:30, label: 'Member', hidden: true, nodeType: 'teamMember', color: {
      background: memberColor,
      border: edgesColor
  } ,
  description: "Weronika T. Adrian"},
    { id: 4, image: 'http://127.0.0.1:8887/KK.png', shape:'circularImage',size:30, label: 'Member', hidden: true, nodeType: 'teamMember', color: {
      background: memberColor,
      border: edgesColor
  },
  description: "Krzysztof Kluza" },
    { id: 5, image: 'http://127.0.0.1:8887/MA.png', shape:'circularImage',size:30, label: 'Member', hidden: true, nodeType: 'teamMember', color: {
      background: memberColor,
      border: edgesColor
  } ,
  description: "Marek Adrian"},
    { id: 6, image: 'http://127.0.0.1:8887/PW.png', shape:'circularImage',size:30, label: 'Member', hidden: true, nodeType: 'teamMember', color: {
      background: memberColor,
      border: edgesColor
  },
  description: "Piotr Wiśniewski"}
  ];

  var areaOfResearchNodes = [{ id: 7, shape: areaShape,size:30, label: 'Area \nof research', hidden: true, nodeType: 'areaOfResearch', color: {
    background: areaOfResearchColor,
    border: edgesColor
} },
  { id: 8, shape: areaShape,size:30, label: 'Area \nof research', hidden: true, nodeType: 'areaOfResearch', color: {
    background: areaOfResearchColor,
    border: edgesColor
} },
  { id: 9, shape: areaShape,size:30, label: 'Area \nof research', hidden: true, nodeType: 'areaOfResearch', color: {
    background: areaOfResearchColor,
    border: edgesColor
}}];

  var publicationNodes = [{ id: 10, shape: pubShape,size:30, label: 'Publication', hidden: true, nodeType: 'publication', color: {
    background: pubColor,
    border: edgesColor
} },
  { id: 11, shape: pubShape,size:30, label: 'Publication', hidden: true, nodeType: 'publication' , color: {
    background: pubColor,
    border: edgesColor
}},
  { id: 12, shape: pubShape,size:30, label: 'Publication', hidden: true, nodeType: 'publication', color: {
    background: pubColor,
    border: edgesColor
}},
  { id: 13, shape: pubShape,size:30, label: 'Publication', hidden: true, nodeType: 'publication', color: {
    background: pubColor,
    border: edgesColor
} },
  { id: 14, shape: pubShape,size:30, label: 'Publication', hidden: true, nodeType: 'publication', color: {
    background: pubColor,
    border: edgesColor
} },
  { id: 15, shape: pubShape,size:30, label: 'Publication', hidden: true, nodeType: 'publication', color: {
    background: pubColor,
    border: edgesColor
}}];

  var nodes = new DataSet(memberNodes.concat(areaOfResearchNodes, publicationNodes));

  var edges =  new DataSet([
    { from: 0, to: 7 },
    { from: 0, to: 8 },
    { from: 0, to: 9 },
    { from: 7, to: 12 },
    { from: 7, to: 13 },
    { from: 8, to: 10 },
    { from: 8, to: 11 },
    { from: 9, to: 14 },
    { from: 9, to: 15 },
    { from: 10, to: 3 },
    { from: 10, to: 4 },
    { from: 10, to: 5 },
    { from: 11, to: 5 },
    { from: 11, to: 3 },
    { from: 12, to: 1 },
    { from: 12, to: 2 },
    { from: 13, to: 6 },
    { from: 13, to: 4 },
    { from: 14, to: 5 },
    { from: 14, to: 6 },
    { from: 15, to: 1 },
    { from: 15, to: 5 },
    { from: 15, to: 3 }
  ]);


  var projectNodes = [];

  var eventNodes = [];
  var subjectNodes = [];

  var projectNodes = [];
  
  var edges1 =  new DataSet([
    { from: 3, to: 2 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 7, to: 2 },
    { from: 6, to: 2 }
  ]);
  
  const options = {
      nodes:
      { 
        shadow: {
            size: 40,
          color: shadowColor},
        borderWidth:8,
        // borderWidthSelected: function (borderWidth) {return borderWidth*3;},
            size:50,
            color: {
            highlight: highlightColor,
            hover: {border: edgesColor}
        }},
    edges: {
        color: {
          color: edgesColor,
          highlight: highlightColor
        },
        width: 3,
        selectionWidth: function (width) {return width*3;},
        length: 275,
        hoverWidth: .05
      }
       ,
      physics: {
        barnesHut: {
          centralGravity: 2.0,
          springConstant: 0,
          avoidOverlap: 0.2
        }
      },
      interaction:
    {  hover:
        true,
        hoverConnectedEdges: false
    }
  };

  // function getNodeById(id) {
  //   return nodes.filter(
  //     function(nodes) {
  //       return nodes.id == id
  //     }
  //   );
  // }

  function changeLogoColor(nodesArray, color){
    if(color === 'gray'){
      nodesArray[0].image = 'http://127.0.0.1:8887/logo_szare.png';
    }else{
      nodesArray[0].image = 'http://127.0.0.1:8887/logo_wyciete_new.png';
      }
    }
  

  function showHideNodes(idsArray, selectedNode){
      var allNodes = nodes.get({ returnType: "Object" });
      var i;
      var nodesToHide = new DataSet(nodes.get({
        filter: function (node) {
          return idsArray.includes(node.id);
        }
      }));
      
      var nodesCopy = [];

      //expanding neihbour nodes
      for(const node of nodesToHide.get({fields: ['id', 'hidden']})){
        if(node.id === 0) continue;
        if(node.hidden !== false) {
          nodesCopy.push({id: node.id, hidden: !node.hidden}); 
        }
      }
      //if all neighbour nodes are expanded - highlighting
      if (nodesCopy.length === 0){
        //if nothing already highlighted
        if(highlightActive === false){
        highlightActive = true;
        //options.nodes.color = {background: edgesColor,border: edgesColor};

        for (var nodeId in allNodes) {
          //alert(JSON.stringify(allNodes[nodeId]));
          //unselect everything
          allNodes[nodeId].color = {background: edgesColor,border: edgesColor};

          if (allNodes[nodeId].hiddenLabel === undefined) {
            allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
            allNodes[nodeId].label = undefined;
          }
        }
        
        changeLogoColor(allNodes, 'gray');
        var connectedNodes = network.current.getConnectedNodes(selectedNode);
        var allConnectedNodes = [];
        
        //select proper nodes
        for (i = 0; i < connectedNodes.length; i++) {
          var typeColor = nodeTypeColors[allNodes[connectedNodes[i]].nodeType] 
          allNodes[connectedNodes[i]].color = {background: typeColor, border: highlightColor};
          if (allNodes[connectedNodes[i]].hiddenLabel !== undefined) {
            allNodes[connectedNodes[i]].label = allNodes[connectedNodes[i]].hiddenLabel;
            allNodes[connectedNodes[i]].hiddenLabel = undefined;
          }
          // selected node label
          if(connectedNodes[i] === 0 || selectedNode === 0){
            changeLogoColor(allNodes, 'blue');
          }
          
        }
        allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
        allNodes[selectedNode].hiddenLabel = undefined;
      }else{
        //if something was already highlighted - unhighlight everything
        for (var nodeId in allNodes) {
          var typeColor = nodeTypeColors[allNodes[nodeId].nodeType] 
          allNodes[nodeId].color = {background: typeColor,border: edgesColor};
          if (allNodes[nodeId].hiddenLabel !== undefined) {
            allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
            allNodes[nodeId].hiddenLabel = undefined;
          }
        }
        changeLogoColor(allNodes, 'blue');
        network.current.unselectAll();
        highlightActive = false;
      }
      // transform  object into an array and update graph
      var updateArray = [];
      for (nodeId in allNodes) {
        if (allNodes.hasOwnProperty(nodeId)) {
          updateArray.push(allNodes[nodeId]);
        }
      }
      nodes.update(updateArray);
      }
      else{
        //****           TODO: something is no yes with first time highlighting if neighbours!=0      ***
      //   if(highlightActive === true){
      //     for (var nodeId in allNodes) {
      //       var typeColor = nodeTypeColors[allNodes[nodeId].nodeType] 
      //       allNodes[nodeId].color = {background: typeColor,border: typeColor};
      //       if (allNodes[nodeId].hiddenLabel !== undefined) {
      //         allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
      //         allNodes[nodeId].hiddenLabel = undefined;
      //       }
      //     }
      //     highlightActive = false;
      //   }else{
      //     for (var nodeId in allNodes) {
      //       //alert(JSON.stringify(allNodes[nodeId]));
      //       //unselect everything
      //       if(!idsArray.includes(nodeId)){
      //       allNodes[nodeId].color = {background: edgesColor,border: edgesColor};
  
      //       if (allNodes[nodeId].hiddenLabel === undefined) {
      //         allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
      //         allNodes[nodeId].label = undefined;
      //       }
      //     }else{
      //       for (var neighId in idsArray) {
      //         var typeColor = nodeTypeColors[allNodes[neighId].nodeType] 
      //         allNodes[neighId].color = {background: typeColor, border: typeColor};
      //         if (allNodes[neighId].hiddenLabel !== undefined) {
      //           allNodes[neighId].label = allNodes[neighId].hiddenLabel;
      //           allNodes[neighId].hiddenLabel = undefined;
      //         }
      //         // selected node label
              
      //       }

      //     }
      //     allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
      //     allNodes[selectedNode].hiddenLabel = undefined;
      //     }
      //     highlightActive = true;
      //   }
        nodes.update(nodesCopy);
      }
  }


  useEffect(() => {
    network.current =
      new Network(domNode.current, { nodes, edges }, options);
  }
  , [domNode, network, nodes, edges]);
  useEffect(() => {
    network.current.on("click", function(e) { 
      var clickedId = nodes.get(e.nodes[0]).id;

      if(clickedId !== undefined){
        var neighEdges = new DataSet(edges.get({
          filter: function (edge) {
            return edge.from === clickedId || edges.to === clickedId;
          }
        }));
        
        var neighbours = [];
        neighEdges.forEach(edge => {
          if(edge.from === clickedId){
            neighbours.push(edge.to);
          }else neighbours.push(edge.from);
        });

        //alert(neighbours);
        showHideNodes(neighbours, clickedId);
    }
    else{
      var allNodes = nodes.get({ returnType: "Object" });
      if(highlightActive === true){
        for (var nodeId in allNodes) {
          //alert("jestem");
          var typeColor = nodeTypeColors[allNodes[nodeId].nodeType] 
          allNodes[nodeId].color = {background: typeColor,border: edgesColor};
          if (allNodes[nodeId].hiddenLabel !== undefined) {
            allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
            allNodes[nodeId].hiddenLabel = undefined;
          }
        }
        changeLogoColor(allNodes, 'blue');

        network.current.unselectAll();
        var updateArray = [];
        for (nodeId in allNodes) {
          if (allNodes.hasOwnProperty(nodeId)) {
            updateArray.push(allNodes[nodeId]);
          }
        }
        nodes.update(updateArray);
        highlightActive = false;
      }
    }
    });

    network.current.on("doubleClick", function(e) {
      var clickedId = nodes.get(e.nodes[0]).id;
      if(currFocusedNode !== clickedId 
        && currFocusedNode!==undefined){
      if(clickedId !== 0){
        var opt = {
          scale: 2.0,
          animation: {
            duration: 1000
          },
        };
        network.current.focus(clickedId, opt);
        currFocusedNode = clickedId; 
    }
  }else{
    var opt2 = {
      scale: 1.0,
      animation: {
        duration: 1000
      },
    };
    network.current.focus(0, opt2); 
    currFocusedNode = 2; 
  }
  });

  // network.current.on("showPopup", function(e){
  //   // functionality for popup to show on mouseover
  //   var allNodes = nodes.get({ returnType: "Object" });
  //   //var clickedId = nodes.get(e.nodes[0]).id;

  //   var descriptionElement = document.createElement("div");
  //   descriptionElement.style.border = "1px solid gray";
  //   descriptionElement.style.height = "10em";
  //   descriptionElement.style.width = "10em";
  //   var descriptionElementInner = document.createElement("div");
  //   descriptionElementInner.innerHTML = allNodes[clickedId].description
  //   descriptionElement.appendChild(descriptionElementInner);


  //   nodes.update({id: clickedId, description: descriptionElement})
  // });
  
  network.current.on("hoverNode",function (e) {
    var allNodes = nodes.get({ returnType: "Object" });

    //console.log(allNodes[e.node].description);
    var description = (allNodes[e.node].description === undefined) ? "" : allNodes[e.node].description;
    document.getElementsByClassName("text-content")[0].innerHTML = description;
});


  });

  return <div ref={domNode} style={{ width: '100%', height: '100%'}} />;
};

export default Graph;
