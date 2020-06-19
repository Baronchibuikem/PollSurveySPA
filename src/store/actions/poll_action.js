import { ALLPOLL, CREATEPOLL, SINGLEPOLL, CREATEPOLL_FAIL, SINGLEPOLL_FAIL } from "../actions/actionTypes"
import route from "../../ApiClient";
import { tokenConfig } from "../getTokenFromState"
import { callApi } from "../index";


/* 
This can also be used to send a post request to the backend, but i choose not to use it, since the
imported callApi has been probably customized and made reusuable for making CRUD request.
----------------------------------------------------------------------------------------
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
    -------------------------------------------------------------------------------------
}; */

/* Used for sending data to the backend to create a new poll */
export const create_poll = (data) => {
    return async dispatch => {
        try {
            const response = await callApi("polls/create-polls/", {
                poll_question: data.question,
                choices: data.choices,
                poll_expiration_date: data.date
            }, "POST", data.token)
            if (response) {
                dispatch({ type: CREATEPOLL, payload: response.data });
                dispatch(get_polls(data))
            }
        } catch (error) {
            dispatch({ type: CREATEPOLL_FAIL, payload: error.response })
        }

    };
};

export const get_polls = (data) => {
    let config = {
        headers: {
            Authorization: `Token ${data.token}`,
            "Content-Type": "application/json"
        },
    };
    return async dispatch => {
        try {
            const response = await route.get("polls/all-polls/", null,
                config)
            if (response) {
                console.log(response.data)
                dispatch({ type: ALLPOLL, payload: response.data });
            }
        } catch (error) {
            dispatch({ type: CREATEPOLL_FAIL, payload: error.response })
        }

    };
};

export const get_single_poll = (data) => {
    return async (dispatch, getState) => {
        const token = getState().userAuth.token
        console.log(token)
        let config = {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json"
            },
        };
        console.log(config, "CONFIG")

        try {
            const response = await route.get(`polls/all-polls/${data}/`,
                config)
            if (response) {
                console.log(response.data)
                dispatch({ type: SINGLEPOLL, payload: response.data });
            }
        } catch (error) {
            dispatch({ type: SINGLEPOLL_FAIL, payload: error.response })
        }

    };
};