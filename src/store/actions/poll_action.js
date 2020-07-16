import { ALLPOLL, ALLPOLL_FAIL, VOTE_FAIL, SINGLEPOLL, CREATEPOLL_FAIL, SINGLEPOLL_FAIL } from "../actions/actionTypes"
import route from "../../ApiClient";
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
                dispatch(get_polls())
            }
        } catch (error) {
            dispatch({ type: CREATEPOLL_FAIL, payload: error.response })
        }

    };
};

export const get_polls = () => {
    return async (dispatch, getState) => {
        const token = getState().userAuth.token
        let config = {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json"
            },
        };
        try {
            const response = await route.get("polls/all-polls/",
                config)
            console.log(response.data)
            if (response) {
                dispatch({ type: ALLPOLL, payload: response.data });
            }
        } catch (error) {
            dispatch({ type: ALLPOLL_FAIL, payload: error.response })
        }

    };
};

export const get_single_poll = (data) => {
    return async (dispatch, getState) => {
        const token = getState().userAuth.token
        let config = {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json"
            },
        };
        try {
            const response = await route.get(`polls/all-polls/${data}/`,
                config)
            console.log(response.data)
            if (response) {
                dispatch({ type: SINGLEPOLL, payload: response.data });
            }
        } catch (error) {
            dispatch({ type: SINGLEPOLL_FAIL, payload: error.response })
        }

    };
};

export const post_currentuser_vote = (data) => {
    const { poll_id, choice_id } = data
    console.log(poll_id, choice_id, "CHOICE ID AND POLL ID")
    return async (dispatch, getState) => {
        const token = getState().userAuth.token
        let config = {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json"
            },
        };
        try {
            const response = await route.post(`/polls/vote/${poll_id}/${choice_id}/`, {
                choice_id: choice_id, poll_id: poll_id
            },
                config)
            if (response) {
                dispatch(get_polls())
            }
        } catch (error) {
            console.log(error.response.data.non_field_errors)
            dispatch({ type: VOTE_FAIL, payload: error.response.data.non_field_errors })
        }

    };
};

export const post_delete_poll = (data) => {
    console.log(data, "from poll patch")
    return async (dispatch, getState) => {
        const token = getState().userAuth.token
        let config = {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json"
            },
        };
        try {
            const response = await route.delete(`/polls/all-polls/${data.poll_id}/`, config)
            if (response) {
                dispatch(get_polls())
            }
        } catch (error) {
            console.log(error.response.data.non_field_errors)
            dispatch({ type: VOTE_FAIL, payload: error.response.data.non_field_errors })
        }

    };
};
