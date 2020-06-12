import {
	USER_LOADED,
	REQUEST_LOADING,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
} from "../actions/actionTypes";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	isLoading: "Send",
	user: {
		id: "",
		first_name: "",
		last_name: "",
		username: "",
		gender: "",
		email: "",
		position: "",
		bio: "",
	},
	email_exist_error: "",
	username_exist_error: ""
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_LOADING:
			return {
				...state,
				isLoading: "Loading",
			};
		// This is used to mutate/update the state on successful login/registration
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
		case USER_LOADED:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				user: action.payload.user,
				isAuthenticated: true,
			};
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
		case LOGOUT_SUCCESS:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false
			}
		default:
			return state;
	}
};

export default reducer;
