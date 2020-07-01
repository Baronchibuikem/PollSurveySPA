import {
	USER_LOADED,
	REQUEST_LOADING,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL, CURRENT_LOGGEDIN_USER, CURRENT_LOGGEDIN_USER_FAIL, VIEWED_LOGGEDIN_USER
} from "../actions/actionTypes";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	isLoading: "Submit",
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
		likes: [],
		polls: []
	},
	email_exist_error: "",
	username_exist_error: "",
	login_email_error: "",
	login_error: ""

};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_LOADING:
			return {
				...state,
				isLoading: "Loading...",
			};
		// This is used to mutate/update the state on successful login/registration
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
		case USER_LOADED:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				// user: action.payload.user,
				// isAuthenticated: true,
				token: action.payload.token
			};
		case CURRENT_LOGGEDIN_USER:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				// token: action.payload.user.

			};
		case VIEWED_LOGGEDIN_USER:
			return {
				...state,
				view_user: action.payload
			}
		case AUTH_ERROR:
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
				token: null,
				user: null,
				isLoading: "Try again",
				login_email_error: action.payload.email,
				login_error: action.payload
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
		default:
			return state;
	}
};

export default reducer;
