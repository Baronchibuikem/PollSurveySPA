import {
	USER_LOADED,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	REQUEST_LOADING,
} from "./actionTypes";
import route from "../../ApiClient";

// Setup config with token - helper function

export const tokenConfig = (getState) => {
	// Get token
	const token = getState().userAuth.token;
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

let config = { headers: { "Content-Type": "application/json" } };


export const loadUser = (id) => {
	return async (dispatch, getState) => {
		const response = await route.get(
			`api/v1/account/user/${id}`,
			tokenConfig(getState)
		);
		dispatch({ type: USER_LOADED, payload: response.data.user });
	};
};

// LOGIN USER
export const login = ({ email, password }) => (dispatch) => {
	route
		.post("api/v1/account/login/", { email, password }, config)
		.then((response) => {
			console.log(response.data.user.id)
			dispatch({ type: USER_LOADED, payload: response.data });
			// dispatch(loadUser(response.data.user.id));
		})
		.catch((error) => {
			dispatch({ type: LOGIN_FAIL, payload: error.response.data });
		});
};

// Register user
export const register_action = ({ data }) => (dispatch) => {
	dispatch({ type: REQUEST_LOADING })
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
		});
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
	route
		.post("/api/v1/account/logout/", null, tokenConfig(getState))
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


