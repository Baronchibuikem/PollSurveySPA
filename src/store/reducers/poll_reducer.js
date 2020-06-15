import { ALLPOLL, CREATEPOLL, SINGLEPOLL } from "../actions/actionTypes"

const initialState = {
    poll: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ALLPOLL:
            return {
                ...state,
                poll: action.payload
            }
        default:
            return state
    }
}
export default reducer;