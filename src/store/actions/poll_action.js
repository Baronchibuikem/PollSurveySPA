import { ALLPOLL, CREATEPOLL, SINGLEPOLL } from "../actions/actionTypes"
import route from "../../ApiClient";
import { tokenConfig } from "../getTokenFromState"



export const create_poll = (data) => {
    let config = {
        headers: {
            Authorization: `Token ${data.token}`,
            "Content-Type": "application/json"
        },
    };
    return async dispatch => {
        const response = await route.post("polls/create-polls/", {
            poll_question: data.question, choices: data.options, poll_expiration_date: data.date
        }, config)
        dispatch({ type: ALLPOLL, payload: response.data });
    };
};