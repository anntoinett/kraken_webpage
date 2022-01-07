import React, { useEffect, useRef } from 'react';
import './style.css';
import Graph from './Graph';
import './vis-network.min.css';
import { useState } from "react";
import './stars.css';

export default function App() {

  const data = useRef({
    publications: '',
    projects: '',
    events:'',
    subjects: ''
  });
  //const data = useRef(null);
  const [view, setView] = useState('');

  // const sendDataToGraph = useCallback((view) => {
  //   if(view === "publications"){
  //     fetch('http://localhost:8080/kraken/teamMembers', {method: 'get'})
  //       .then(res => res.json())
  //       .then((response) => {
  //         console.log("fetch");
  //         setData({"publications": response});
  //         //console.log(data);

  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //     //setData("Publications clicked");
  //   }else if(view === "projects"){
  //     setData("Projects clicked");
  //   }else if(view === "events"){
  //     setData("Events clicked");
  //   }else if(view === "subjects"){
  //     setData("Subjects clicked");
  //   }
  // }, []);

  // useEffect( () => {
  //   console.log("fetch");
  //   if(view === "publications"){
  //     fetch('http://localhost:8080/kraken/teamMembers', {method: 'get'})
  //       .then(res => res.json())
  //       .then((response) => {
  //         setData({"publications": response});
  //         //console.log(data);

  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //     //setData("Publications clicked");
  //   }else if(view === "projects"){
  //     //setData("Projects clicked");
  //     setData({aa: "Projects clicked"});
  //   }else if(view === "events"){
  //     setData({aa: "Projects clicked"});
  //   }else if(view === "subjects"){
  //     setData({aa: "Projects clicked"});
  //   }
  // }, [view]);
  useEffect( () => {
    console.log("fetch");

    var url = 'http://localhost:8080/krakenApi/';

    const fetchData = async (dataType) => {
      let response = await fetch(`${url}/${dataType}`, {method: 'get'});
      let content;

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
          content = await response.json();
      }
      return content;
    };

    const fetchAll = async () => {
      let publications = fetchData('publications');
      let projects = fetchData('projects');
      let events = fetchData('events');
      let subjects = fetchData('courses');

      let values = await Promise.all([publications, projects, events, subjects]);
      console.log(values);
      data.current = {
        publications: values[0],
        projects: values[1],
        events: values[2],
        subjects: values[3]
      };
      setView('publications');
    };  

    fetchAll();
  }, []);

  console.log("rendering");

  document.getElementById("publications").addEventListener("click", function() {
    //document.getElementById("publications").style.backgroundColor = "#18d6f8"
    setView("publications");
  })
  document.getElementById("projects").addEventListener("click", function() {
    setView("projects");
  })
  document.getElementById("events").addEventListener("click", function() {
    setView("events");
  })
  document.getElementById("subjects").addEventListener("click", function() {
    setView("subjects");
  })

  const getProperData = () => {
    switch (view) {
      case 'publications':
        // console.log('Oranges are $0.59 a pound.');
        return data.current.publications
      case 'projects':
        return data.current.projects
      case 'events':
        return data.current.events
      case 'subjects':
        return data.current.subjects
      default:
        return "";
    }
  }

  return (
    <div class="graph">
      <Graph data_from_db={getProperData()}/>
    </div>
  );
}
