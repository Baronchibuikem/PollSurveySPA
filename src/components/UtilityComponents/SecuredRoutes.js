import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			if (auth.isLoading) {
				return <h2 className="text-center mt-5 pt-5">Loading</h2>;
				// return (
				// 	<div className="d-flex align-items-center justify-content-center">
				// 		<div className="h-100 spinner-border" role="status">
				// 			<span class="sr-only">Loading...</span>
				// 		</div>
				// 	</div>
				// );
			} else if (!auth.isAuthenticated) {
				return <Redirect to="/authentication" />;
			} else {
				return <Component {...props} />;
			}
		}}
	/>
);

const mapStateToProps = state => ({
	auth: state.userAuth
});

export default connect(mapStateToProps)(PrivateRoute);
