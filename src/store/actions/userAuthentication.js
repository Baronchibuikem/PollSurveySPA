import {
	USER_LOADED,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	REQUEST_LOADING,
	CURRENT_LOGGEDIN_USER,
	CURRENT_LOGGEDIN_USER_FAIL,
	VIEWED_LOGGEDIN_USER,
	LIKE_POLL,
	SET_USER_TOKEN
} from "./actionTypes";
import route from "../../ApiClient";



let config = { headers: { "Content-Type": "application/json" } };

// LOGIN USER
export const login = ({ email, password }) => (dispatch) => {
	dispatch({ type: REQUEST_LOADING })
	route
		.post("/account/login/", { email, password }, config)
		.then((response) => {
			console.log(response.data, "Login")
			dispatch({ type: SET_USER_TOKEN, payload: response.data.token });
			dispatch(getUserById(response.data.user))
			// dispatch({ type: USER_LOADED, payload: response.data });

		})
		.catch((error) => {
			// console.log(error.response.data.data, "ERROR MESSAGE")
			dispatch({ type: LOGIN_FAIL, payload: error.response.data.data });
		});
};

// Register user
export const register_action = ({ data }) => (dispatch) => {
	console.log(data, "from actions")
	dispatch({ type: REQUEST_LOADING })
	route
		.post("/account/register/", {
			first_name: data.firstname,
			last_name: data.lastname,
			email: data.email,
			username: data.username,
			password: data.password
		}, config)
		.then((response) => {
			console.log(response.data)
			dispatch({ type: SET_USER_TOKEN, payload: response.data.token });
			dispatch(getUserById(response.data.user))
		})
		.catch((err) => {
			dispatch({ type: REGISTER_FAIL, payload: err.response });

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
			// dispatch({ type: CURRENT_LOGGEDIN_USER_FAIL, payload: error.response.data })
		}
	}
}

// // For fetching the data of the current logged in user
export const viewClickedUserById = (data) => {
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
				dispatch({ type: VIEWED_LOGGEDIN_USER, payload: response.data });
			}
		} catch (error) {
			// dispatch({ type: VIEWED_LOGGEDIN_USER_FAIL, payload: error.response })
		}
	}
}

export const post_followUser = (data) => {
	console.log(data)
	return async (dispatch, getState) => {
		const token = getState().userAuth.token
		let config = {
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json"
			},
		};
		try {
			const response = await route.post(`/account/follow-user/`, {
				follower: data.follower_id,
				following: data.following_id
			}, config)
			if (response) {
				dispatch({ type: CURRENT_LOGGEDIN_USER, payload: response.data })
			}

		} catch (error) {
			// dispatch({ type: CURRENT_LOGGEDIN_USER_FAIL, payload: error.response.data })
		}
	}
}

export const post_likepost = (data) => {
	console.log(data)
	return async (dispatch, getState) => {
		const token = getState().userAuth.token
		let config = {
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json"
			},
		};
		try {
			const response = await route.post(`/account/like-poll/`, {
				poll: data.poll_id,
				user: data.user_id
			}, config)
			if (response) {
				dispatch({ type: LIKE_POLL, payload: response.data })
			}

		} catch (error) {
			// dispatch({ type: CURRENT_LOGGEDIN_USER_FAIL, payload: error.response.data })
		}
	}
}

export const post_bookmarkpoll = (data) => {
	return async (dispatch, getState) => {
		const token = getState().userAuth.token
		let config = {
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json"
			},
		};
		try {
			const response = await route.post(`/account/bookmark-poll/`, {
				poll: data.poll_id,
				user: data.user_id
			}, config)
			if (response) {
				dispatch({ type: LIKE_POLL, payload: response.data })
			}

		} catch (error) {
			// dispatch({ type: CURRENT_LOGGEDIN_USER_FAIL, payload: error.response.data })
		}
	}
}

