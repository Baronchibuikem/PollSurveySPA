import {

	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	REQUEST_LOADING,
} from "./actionTypes";
import route from "../../ApiClient";


const config = { headers: { "Content-Type": "application/json" } };


// export const loadUser = () => {
// 	return async (dispatch, getState) => {
// 		const response = await route.get(
// 			"api/v1/account/auth/user",
// 			tokenConfig(getState)
// 		);
// 		dispatch({ type: USER_LOADED, payload: response.data });
// 	};
// };

// LOGIN USER
export const login = ({ email, password }) => (dispatch) => {
	dispatch({ type: REQUEST_LOADING })
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const body = JSON.stringify({ email, password });
	route
		.post("api/v1/account/login/", body, config)
		.then((response) => {
			dispatch({ type: LOGIN_SUCCESS, payload: response.data });
		})
		.catch((error) => {
			dispatch({ type: LOGIN_FAIL, payload: error.response.data });
		});
};

// Register user
export const register_action = ({ data }) => (dispatch) => {
	dispatch({ type: REQUEST_LOADING })
	const body = JSON.stringify({
		data
	});
	route
		.post("/api/v1/account/register/", {
			first_name: data.firstname,
			last_name: data.lastname,
			email: data.email,
			username: data.username,
			password: data.password
		}, config)
		.then((res) => {
			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
		})
		.catch((err) => {

			dispatch({ type: REGISTER_FAIL, payload: err.response.data });
			console.log(err.response.data.email.error, "ERROR DQATA");
		});
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
	route
		.post("/api/v1/account/auth/logout", null, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: LOGOUT_SUCCESS,
			});
		})
		.catch((err) => {
			dispatch({
				type: LOGOUT_FAIL,
			});
			console.log(err);
		});
};

// Setup config with token - helper function

export const tokenConfig = (getState) => {
	// Get token
	const token = getState().userAuth.token;

	// Headers
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	if (token) {
		config.headers["Authorization"] = `Token ${token}`;
	}

	return config;
};
