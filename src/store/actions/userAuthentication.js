import {
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_FAIL,
	REQUEST_LOADING,
	CURRENT_LOGGEDIN_USER,
	VIEWED_LOGGEDIN_USER,
	SET_USER_TOKEN,
	MESSAGE,
	UPDATE_FAIL
} from "./actionTypes";
import route from "../../ApiClient";



let config = { headers: { "Content-Type": "application/json" } };

// // LOGIN USER
// export const login = ({ email, password }) => async (dispatch) => {
// 	// dispatch({ type: REQUEST_LOADING })
// 	try {
// 		const response = await route.post("/account/login/", { email, password }, config)
// 		if (response) {
// 			dispatch({ type: SET_USER_TOKEN, payload: response.data.token });
// 			dispatch(getUserById(response.data.user))
// 		}
// 	} catch (error) {
// 		dispatch({ type: LOGIN_FAIL, payload: error.response.data.data })
// 	}
// };

export const login = ({ email, password }) => {
	return async (dispatch) => {
		try {
			const response = await route.post(`account/login/`, { email, password }, config)
			if (response) {
				dispatch({ type: SET_USER_TOKEN, payload: response.data.token });
				dispatch(getUserById(response.data.user))
			}
		} catch (error) {
			// dispatch({ type: CURRENT_LOGGEDIN_USER_FAIL, payload: error.response.data })
			dispatch({ type: LOGIN_FAIL, payload: error.response.data.data })
		}
	}
}

// Register user
export const register_action = ({ data }) => (dispatch) => {
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
				dispatch(getUserById(response.data.follower))
				dispatch(viewClickedUserById(data.following_id))
				// dispatch({ type: CURRENT_LOGGEDIN_USER, payload: response.data })
			}

		} catch (error) {
			// dispatch({ type: CURRENT_LOGGEDIN_USER_FAIL, payload: error.response.data })
		}
	}
}


// For sending post request to unfollow a user
export const post_unfollowUser = (data) => {
	return async (dispatch, getState) => {
		try {
			const response = await route.delete(`/account/unfollow-user/${data.id}/`, {
				headers: {
					Authorization: `Token ${getState().userAuth.token}`,
					"Content-Type": "application/json"
				}
			}, data.id)
			if (response) {
				dispatch(getUserById(data.user_id))
				dispatch(viewClickedUserById(data.clicked_user_id))
			}

		} catch (error) {
			// dispatch({ type: CURRENT_LOGGEDIN_USER_FAIL, payload: error.response.data })
		}
	}
}


// action for liking a poll
export const post_likepost = (data) => {
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
				dispatch(getUserById(data.user_id))
			}
		} catch (error) {
			// dispatch({ type: CURRENT_LOGGEDIN_USER_FAIL, payload: error.response.data })
		}
	}
}


// action for bookmarking a poll
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
				dispatch(getUserById(data.user_id))
			}

		} catch (error) {
			// dispatch({ type: CURRENT_LOGGEDIN_USER_FAIL, payload: error.response.data })
		}
	}
}

// for editing username
export const post_edit_userprofile = (data) => {
	return async (dispatch, getState) => {
		const token = getState().userAuth.token
		let config = {
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json"
			},
		};
		if (data.username) {
			dispatch({ type: REQUEST_LOADING })
			try {
				const response = await route.patch(`/account/user/${data.user_id}/`, { username: data.username }, config)
				if (response) {
					dispatch(getUserById(data.user_id))
					dispatch(viewClickedUserById(data.user_id))
				}

			} catch (error) {
				// dispatch({ type: CURRENT_LOGGEDIN_USER_FAIL, payload: error.response.data })
			}
		} else if (data.email) {
			dispatch({ type: REQUEST_LOADING })
			try {
				const response = await route.patch(`/account/user/${data.user_id}/`, { email: data.email }, config)
				if (response) {
					dispatch(getUserById(data.user_id))
					dispatch(viewClickedUserById(data.user_id))
				}

			} catch (error) {
				// dispatch({ type: CURRENT_LOGGEDIN_USER_FAIL, payload: error.response.data })
			}
		} else if (data.bio) {
			dispatch({ type: REQUEST_LOADING })
			try {
				const response = await route.patch(`/account/user/${data.user_id}/`, { bio: data.bio }, config)
				if (response) {
					dispatch(getUserById(data.user_id))
					dispatch(viewClickedUserById(data.user_id))
				}
				dispatch({ type: MESSAGE })
			} catch (error) {
				// dispatch({ type: CURRENT_LOGGEDIN_USER_FAIL, payload: error.response.data })
			}
		} else if (data.image) {
			dispatch({ type: REQUEST_LOADING })
			let config = {
				headers: {
					Authorization: `Token ${token}`,
					"Content-Type": "multipart/form-data",
				},
			};
			try {
				const response = await route.patch(`/account/user/${data.user_id}/`, data.image, config)
				if (response) {
					dispatch(getUserById(data.user_id))
					dispatch(viewClickedUserById(data.user_id))
				}
				dispatch({ type: MESSAGE })
			} catch (error) {
				dispatch({ type: UPDATE_FAIL })
			}
		}
	}
}
