import React, {
	Fragment
} from "react";
import {
	BrowserRouter as Router
} from "react-router-dom";
// import { useSelector } from "react-redux"
import BaseRouter from "../routes";
import Navbar from "./CommonComponents/Navbar";


const App = () => {

	// const params = useSelector((state) => ({
	// 	token: state.userAuth.token
	// }));
	return (
		<Fragment >
			<Router >
				<Navbar />
				{/* <div className="container-fluid" style={{ paddingTop: "70px" }} > */}
				<div className="">
					{/* <div className="col-md-12 min-vh-100 mx-auto" style={{ backgroundColor: "#f6f9fa" }}> */}
					<div className="min-vh-100 mx-auto" style={{ backgroundColor: "#f6f9fa" }}>
						<BaseRouter />
					</div>
				</div>
			</Router>
		</Fragment >
	);
}

export default App