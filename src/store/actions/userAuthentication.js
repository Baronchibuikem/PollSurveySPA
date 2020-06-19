import {
	USER_LOADED,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	REQUEST_LOADING,
	CURRENT_LOGGEDIN_USER,
	CURRENT_LOGGEDIN_USER_FAIL
} from "./actionTypes";
import route from "../../ApiClient";



let config = { headers: { "Content-Type": "application/json" } };

// LOGIN USER
export const login = ({ email, password }) => (dispatch) => {
	route
		.post("/account/login/", { email, password }, config)
		.then((response) => {
			console.log(response.data)
			dispatch({ type: USER_LOADED, payload: response.data });
			// dispatch(loadUser(response.data.user.id));
		})
		.catch((error) => {
			dispatch({ type: LOGIN_FAIL, payload: error.response });
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


export const logout = () => (dispatch, getState) => {
	// used for loging out a user, we dispatch a LOGOUT_SUCCESS action to our authenticationReducer
	dispatch({
		type: LOGOUT_SUCCESS,
	});

};


// For fetching the data of the current logged in user
export const getUserById = (data) => {
	return async (dispatch, getState) => {
		const token = getState().userAuth.token
		let config = {
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json"
			},
		};

		try {
			const response = await route.get(`/account/user/${data}/`,
				config)
			if (response) {
				console.log(response.data)
				dispatch({ type: CURRENT_LOGGEDIN_USER, payload: response.data });
			}
		} catch (error) {
			dispatch({ type: CURRENT_LOGGEDIN_USER_FAIL, payload: error.response })
		}
	}
}


