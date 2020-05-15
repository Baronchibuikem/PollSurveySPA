import React from "react";
import { Route, Switch } from "react-router-dom";

// import PrivateRoute from "./components/UtilityComponents/SecuredRoutes";
import homepage from "./components/PageComponents/homepage";
import allPolls from "./components/PageComponents/allPolls";

const BaseRouter = () => (
	<Switch>
		<Route exact path="/" component={homepage} />
		<Route exact path="/polls" component={allPolls} />
	</Switch>
);
export default BaseRouter;
