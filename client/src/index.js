import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "./assets/fonts/icomoon/style.css";
import "./assets/styles/bootstrap.min.css";
import "./assets/styles/styles.css";
import "./assets/styles/specific.css";

ReactDOM.render(
  <div className="site-wrap">
    <Routes />
  </div>,
  document.getElementById("root")
);
