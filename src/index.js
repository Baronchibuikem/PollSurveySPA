import React from "react";
import ReactDom from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "antd/dist/antd.css";
import "mdbreact";
import "./components/App.css";

ReactDom.render(<App />, document.querySelector("#root"));
