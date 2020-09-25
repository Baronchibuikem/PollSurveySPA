import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "../routes";
import Navbar from "./CommonComponents/Navbar";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <div className="mt-5">
          <div
            className="min-vh-100 mx-auto"
            style={{ backgroundColor: "#f6f9fa", paddingTop: "1px" }}
          >
            <BaseRouter />
          </div>
        </div>
      </Router>
    </Fragment>
  );
};

export default App;
