import {
	USER_LOADED,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADING,
} from "./actionTypes";
import route from "../../ApiClient";
// import axios from "axios";

// // CHECK TOKEN & LOAD USER
// export const loadUser = () => async (dispatch, getState) => {
// 	// // uSER LOADING
// 	dispatch({ type: USER_LOADING });
// 	route
// 		.get("api/v1/account/auth/user", tokenConfig(getState))
// 		.then(res => {
// 			dispatch({ type: USER_LOADED, payload: res.data });
// 		})
// 		.catch(err => {
// 			dispatch({ type: AUTH_ERROR });
// 		});
// };

export const loadUser = () => {
	return async (dispatch, getState) => {
		const response = await route.get(
			"api/v1/account/auth/user",
			tokenConfig(getState)
		);
		dispatch({ type: USER_LOADED, payload: response.data });
	};
};

// LOGIN USER
export const login = ({ email, password }) => async (dispatch) => {
	dispatch({ type: USER_LOADING });
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
			dispatch({ type: LOGIN_FAIL, payload: error.response.data.data });
			console.log(error.response.data.data);
		});
};

// Register user
export const register = ({
	fullname,
	designation,
	organization,
	purpose_of_data,
	password,
	email,
}) => async (dispatch) => {
	const config = { headers: { "Content-Type": "application/json" } };
	const body = JSON.stringify({
		fullname,
		designation,
		organization,
		purpose_of_data,
		password,
		email,
	});

	route
		.post("/api/v1/account/auth/register", body, config)
		.then((res) => {
			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
		})
		.catch((err) => {
			dispatch({ type: REGISTER_FAIL });
			console.log(err);
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
