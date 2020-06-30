import { ALLPOLL, CREATEPOLL, SINGLEPOLL, ALLPOLL_FAIL, VOTE_FAIL } from "../actions/actionTypes"

const initialState = {
    poll: [],
    single_poll: {
        poll_question: "",
        id: '',
        poll_creator: "",
        poll_creator_image: "",
        poll_creator_id: "",
        poll_has_expired: "",
        poll_creator_fullname: "",
        choices: [{
            id: "",
            poll_name: "",
            votes: [],
            choice_name: "",
            choice_vote_count: "",
            registered_voter: []

        }]
    },
    vote_error: []

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATEPOLL:
        case ALLPOLL:
            return {
                ...state,
                poll: action.payload
            };
        case SINGLEPOLL:
            return {
                ...state,
                single_poll: action.payload
            };
        case VOTE_FAIL:
            return {
                ...state,
                vote_error: action.payload
            };
        default:
            return state
    }
}
export default reducer;