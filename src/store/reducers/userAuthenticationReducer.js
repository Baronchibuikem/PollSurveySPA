import {
	USER_LOADED, REQUEST_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, UNFOLLOW_USER,
	REGISTER_FAIL, CURRENT_LOGGEDIN_USER, VIEWED_LOGGEDIN_USER, LIKE_POLL, SET_USER_TOKEN, MESSAGE, UPDATE_FAIL, DEFAULT_ERROR_MESSAGE

} from "../actions/actionTypes";
import errorReducer from "./ErrorReducer"

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	isLoading: "Submit",
	status: false,
	user: {
		user: {
			id: "",
			first_name: "",
			last_name: "",
			username: "",
			gender: "",
			email: "",
			position: "",
			bio: ""
		},
		boomarks: [],
		followed: [{}],
		followers: [{}],
		likes: [],
		polls: []
	},
	view_user: {
		user: {
			id: "",
			first_name: "",
			last_name: "",
			username: "",
			gender: "",
			email: "",
			position: "",
			bio: ""
		},
		boomarks: [],
		followed: [{}],
		followers: [{}],
		likes: [],
		polls: []
	},
	email_exist_error: "",
	username_exist_error: "",
	error: null


};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_LOADING:
			return {
				...state,
				isLoading: "Loading...",
				status: true
			};

		// if authentication of a user fails upon registration or login
		case AUTH_ERROR:
			return {
				...errorReducer(state, action.payload),
				isLoading: false
			}
		// This is used to mutate/update the state on successful login/registration
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
		case USER_LOADED:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				// user: action.payload.user,
				isAuthenticated: true,
				isLoading: "Submit",
				token: action.payload.token,
				status: false
			};
		case CURRENT_LOGGEDIN_USER:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				status: false
				// token: action.payload

			};
		case SET_USER_TOKEN:
			return {
				...state,
				token: action.payload,
				// isAuthenticated: true
			}
		case UNFOLLOW_USER:
			return {
				...state,
			}
		case MESSAGE:
			return {
				...state,
				status: false
			}
		case UPDATE_FAIL:
			return {
				...state,
				status: false,
				error_message: true
			}
		case VIEWED_LOGGEDIN_USER:
			return {
				...state,
				view_user: action.payload,
				status: false,
			}

		case REGISTER_FAIL:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: "Try Again",
				email_exist_error: action.payload.email.error,
				username_exist_error: action.payload.username.error
			};
		case LOGIN_FAIL:
			return {
				...state,
				error: action.payload
			}
		case LOGOUT_SUCCESS:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: "Submit",

			}
		case LIKE_POLL:
			return {
				...state,
				user: action.payload
			}
		default:
			return state;
	}
};

export default reducer;
