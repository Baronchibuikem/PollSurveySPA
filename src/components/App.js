import React, {
	Component,
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

const App = () => {

	const params = useSelector((state) => ({
		token: state.userAuth.token
	}));
	return (
		<Fragment >
			<Router >
				<Navbar />
				<div className="container" style={{ paddingTop: "70px" }} >
					{
						params.token !== null ?
							<div className="row">
								<div className="col-md-3">
									<ProfileHeader />
								</div>

								<div className="col-md-6 min-vh-100" style={{ backgroundColor: "#f6f9fa" }}>
									<BaseRouter />
								</div>
								<div className="col-md-3">
									<GetTrends />
								</div>
							</div> : <LoginPage />}
				</div>
			</Router>
		</Fragment >
	);
}

export default App