import React from "react";
import { Route, Switch } from "react-router-dom";

// import PrivateRoute from "./components/UtilityComponents/SecuredRoutes";
import Homepage from "./components/PageComponents/homepage";
import AllPolls from "./components/PageComponents/allPolls";
import LoginForm from "./components/PageComponents/loginPage";
import RegistrationForm from "./components/PageComponents/registerPage";
import PrivateRoute from "./components/CommonComponents/PrivateRoute";
import singlePoll from "./components/PageComponents/singlePoll";

const BaseRouter = () => (
	<Switch>
		<PrivateRoute exact path="/" component={Homepage} />
		<Route exact path="/polls" component={AllPolls} />
		<Route exact path="/login" component={LoginForm} />
		<Route exact path="/:id" component={singlePoll} />
		<Route exact path="/register" component={RegistrationForm} />
	</Switch>
);
export default BaseRouter;
