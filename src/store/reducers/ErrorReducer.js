import { AUTH_ERROR } from "../actions/actionTypes"

const ErrorReducer = (state, action) => {
    if (!action.error) {
        return {
            ...state,
            login_error: null
        }
    }

    return {
        ...state,
        error: {
            errorMessage: AUTH_ERROR,
            ...action.payload.response.data
        }
    }
}

export default ErrorReducer