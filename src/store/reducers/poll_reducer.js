import { ALLPOLL, CREATEPOLL, SINGLEPOLL } from "../actions/actionTypes"

const initialState = {
    poll: [],
    single_poll: {
        poll_question: "",
        id: '',
        poll_creator: "",
        poll_creator_image: "",
        poll_has_expired: "",
        poll_creator_fullname: "",
        choice: [{
            id: "",
            poll_name: "",
            votes: [],
            choice_name: ""
        }]
    }

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
        // case SINGLEPOLL:
        //     return{
        //         ...state,
        //         poll: action
        //     }
        default:
            return state
    }
}
export default reducer;