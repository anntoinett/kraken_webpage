import React, { useEffect, useRef } from 'react';
import { data, Network } from 'vis-network';
import { DataSet } from 'vis-data';

const Graph = ({data_from_db}) => {

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

  var nodeTypeColors = {"teamMember": memberColor, "kraken": pubColor, "publication": pubColor, "areaOfResearch": areaOfResearchColor};

  var memberNodes = [];
  var areaOfResearchNodes = [];
  var viewTypeNodes = [];
  var connections = [];

  console.log(Object.keys(data_from_db)[0]);
  console.log(data_from_db.publications);  

  var chosen_view = Object.keys(data_from_db)[0];

  viewTypeNodes.push( { id: 12, image: 'http://127.0.0.1:8887/logo.png', shape:'image',size:70, label: '', nodeType: 'kraken', color: {
    background: memberColor,
    border: edgesColor
}, description: "KRaKEn is a research group led by Professor Antoni Ligęza. It is composed mainly of scientists working in the Department of Applied Computer Science, Faculty of Electrical Engineering, Automatics, Computer Science and Biomedical Engineering, AGH University of Science and Technology, as well as doctoral students and team collaborators. Between 2009 and 2019, the members of the group cooperated within other teams and projects. The current composition and research profile of KRaKEn was established in 2019, after some of the group’s members returned to Poland upon completion of their doctorates and post-doctoral project abroad."},);

function prepare_graph_data(view){
    if(view=='publications'){
      for (let i = 0; i < data_from_db.publications.length; i++){
      var pub = Object.values(data_from_db.publications)[i]
        viewTypeNodes.push(
          { id: pub.id, 
            shape: pubShape,
            size:30, 
            label: 'Publication', 
            hidden: true, 
            nodeType: 'publication', 
            color: {
              background: pubColor,
              border: edgesColor
            }, 
            name: pub.name,
            title: pub.name,
            year: pub.year,
            link: pub['link'], 
            description: pub.description
          });
      }
      for (let i = 0; i < data_from_db.coauthors.length; i++){
        var author = Object.values(data_from_db.coauthors)[i]
        memberNodes.push(
      { id: author.id, 
        image: 'http://127.0.0.1:8887/' + author.photo_file, 
        shape:'circularImage',
        size:30, 
        label: 'Member', 
        hidden: true, 
        nodeType: 'teamMember',
        color: {
          background: memberColor,
          border: edgesColor,
        },
        name: author.name,
        title: author.name,
        description: author.description,
        academic_title: author.academic_title
      });
    }
    }
    else if(view==='projects'){
      for (let i = 0; i < data_from_db.projects.length; i++){
        var project = Object.values(data_from_db.projects)[i]
          viewTypeNodes.push(
            { id: project.id, 
              shape: pubShape,
              size:30, 
              label: 'Project', 
              hidden: true, 
              nodeType: 'publication', 
              color: {
                background: pubColor,
                border: edgesColor
              }, 
              name: project.name,
              title: project.name,
              year: project.year,
              link: project['link'], 
              description: project.description
            });
        }
        for (let i = 0; i < data_from_db.contributors.length; i++){
          var contributor = Object.values(data_from_db.contributors)[i]
          memberNodes.push(
        { id: contributor.id, 
          image: 'http://127.0.0.1:8887/' + contributor.photo_file, 
          shape:'circularImage',
          size:30, 
          label: 'Member', 
          hidden: true, 
          nodeType: 'teamMember',
          color: {
            background: memberColor,
            border: edgesColor,
          },
          name: contributor.name,
          title: contributor.name,
          description: contributor.description,
          academic_title: contributor.academic_title
        });
      }
    }
    else if(view==='events'){
      for (let i = 0; i < data_from_db.events.length; i++){
        var event = Object.values(data_from_db.events)[i]
          viewTypeNodes.push(
            { id: event.id, 
              shape: pubShape,
              size:30, 
              label: 'Event', 
              hidden: true, 
              nodeType: 'publication', 
              color: {
                background: pubColor,
                border: edgesColor
              }, 
              name: event.name,
              title: event.name,
              year: event.year,
              link: event['link'], 
              description: event.description
            });
        }
        for (let i = 0; i < data_from_db.participants.length; i++){
          var participant = Object.values(data_from_db.participants)[i]
          memberNodes.push(
        { id: participant.id, 
          image: 'http://127.0.0.1:8887/' + participant.photo_file, 
          shape:'circularImage',
          size:30, 
          label: 'Member', 
          hidden: true, 
          nodeType: 'teamMember',
          color: {
            background: memberColor,
            border: edgesColor,
          },
          name: participant.name,
          title: participant.name,
          description: participant.description,
          academic_title: participant.academic_title
        });
      }
    }
    else if(view==='courses'){
      for (let i = 0; i < data_from_db.courses.length; i++){
        var course = Object.values(data_from_db.courses)[i]
          viewTypeNodes.push(
            { id: course.id, 
              shape: pubShape,
              size:30, 
              label: 'Course', 
              hidden: true, 
              nodeType: 'publication', 
              color: {
                background: pubColor,
                border: edgesColor
              }, 
              name: course.name,
              title: course.name,
              year: course.year,
              link: course['link'], 
              description: course.description
            });
        }
        for (let i = 0; i < data_from_db.coteachers.length; i++){
          var teacher = Object.values(data_from_db.coteachers)[i]
          memberNodes.push(
        { id: teacher.id, 
          image: 'http://127.0.0.1:8887/' + teacher.photo_file, 
          shape:'circularImage',
          size:30, 
          label: 'Member', 
          hidden: true, 
          nodeType: 'teamMember',
          color: {
            background: memberColor,
            border: edgesColor,
          },
          name: teacher.name,
          title: teacher.name,
          description: teacher.description,
          academic_title: teacher.academic_title
        });
      }
    }
    if(view){
    for (let i = 0; i < data_from_db.areas.length; i++){
      var area = Object.values(data_from_db.areas)[i]
      areaOfResearchNodes.push(
        { id: area.id, 
          name: area.name,
          title: area.name,
          description: area.description,
          shape: areaShape,
          size:30, 
          label: 'Area \nof research', 
          hidden: true, 
          nodeType: 'areaOfResearch', 
          color: {
            background: areaOfResearchColor,
            border: edgesColor
          } 
        });
        connections.push({from: 12, to: area.id});;
    }
    
    for (let i = 0; i < data_from_db.connections.length; i++){
      connections.push(JSON.parse(data_from_db.connections[i]));
    }}
  }
  prepare_graph_data(chosen_view);
  

  var nodes = new DataSet(memberNodes.concat(areaOfResearchNodes, viewTypeNodes));
  console.log('polaczone przeszly');
  console.log(connections);

  var edges =  new DataSet(connections);
  
  const options = {
      nodes:
      { 
        shadow: {
            size: 40,
            color: shadowColor},
            borderWidth:8,
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
    {   hover:
        true,
        hoverConnectedEdges: false
    }
  };


  function changeLogoColor(nodesArray, color){
    if(color === 'gray'){
      nodesArray[12].image = 'http://127.0.0.1:8887/logo_gray.png';
    }else{
      nodesArray[12].image = 'http://127.0.0.1:8887/logo.png';
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
        if(node.id === 12) continue;
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
          if(connectedNodes[i] === 12 || selectedNode === 12){
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
      if(clickedId !== 12){
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
    network.current.focus(12, opt2); 
    currFocusedNode = 2; 
  }
  });
  
  network.current.on("hoverNode",function (e) {
    var allNodes = nodes.get({ returnType: "Object" });

    document.getElementsByClassName("text-content")[0].innerHTML='';
    var description = (allNodes[e.node].description === undefined) ? "" : allNodes[e.node].description;
    document.getElementsByClassName("text-content")[0].innerHTML=description;

    // var ptag1 = document.createElement("p");
    // ptag1.innerHTML = description;
    // var ptag = document.createElement("p");
    // ptag.innerHTML = allNodes[e.node].name;
    // var atag = document.createElement("a");
    // atag.href = allNodes[e.node].link;
    // atag.innerHTML = 'Link';
    // document.getElementsByClassName("text-content")[0].appendChild(ptag);
    // document.getElementsByClassName("text-content")[0].appendChild(atag);
    // document.getElementsByClassName("text-content")[0].appendChild(ptag1);
});


  });

  return <div ref={domNode} style={{ width: '100%', height: '100%'}} />;
};

export default Graph;
