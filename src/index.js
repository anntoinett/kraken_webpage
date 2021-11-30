import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import './vis-network.min.css';
import './stars.css';
import App from "./App";

const foo = {foot: "aa"}
ReactDOM.render(<App props={foo}/>, document.getElementById("root"));

// ReactDOM.render(<Background />, document.getElementById("upper"));
// ReactDOM.render(<Background />, document.getElementById("backgr"));
