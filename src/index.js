import React from "react";
import ReactDom from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "antd/dist/antd.css";
import "mdbreact";
import { Provider } from "react-redux";
import store from "./store";

ReactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
