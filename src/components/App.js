import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import { loadUser } from "../store/actions/userAuthentication";
import BaseRouter from "../routes";
import Navbar from "./CommonComponents/Navbar";
// import Footer from "./CommonComponents/Footer";

export default class App extends Component {
	// componentDidMount() {
	// 	store.dispatch(loadUser());
	// }
	render() {
		return (
			<Fragment>
				<Router>
					<Navbar />
					<div className="container mt-2">
						<BaseRouter />
					</div>
					{/* <Footer /> */}
				</Router>
			</Fragment>
		);
	}
}
