import React, {
	Fragment
} from "react";
import {
	BrowserRouter as Router
} from "react-router-dom";
import { useSelector } from "react-redux"
import BaseRouter from "../routes";
import Navbar from "./CommonComponents/Navbar";
import ProfileHeader from "./PageComponents/profileHeader"
import GetTrends from "./PageComponents/getTrends"
import LoginPage from "./PageComponents/loginPage"
import RegisterPage from "./PageComponents/registerPage"

const App = () => {

	const params = useSelector((state) => ({
		token: state.userAuth.token
	}));
	return (
		<Fragment >
			<Router >
				<Navbar />
				<div className="container" style={{ paddingTop: "70px" }} >
					<div className="row">
						<div className="col-md-12 min-vh-100 mx-auto" style={{ backgroundColor: "#f6f9fa" }}>
							<BaseRouter />
						</div>
					</div>
				</div>
			</Router>
		</Fragment >
	);
}

export default App