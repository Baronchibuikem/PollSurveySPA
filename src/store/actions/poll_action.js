import {
  ALLPOLL,
  ALLPOLL_FAIL,
  VOTE_FAIL,
  SINGLEPOLL,
  CREATEPOLL_FAIL,
  REQUEST_ERROR,
  REQUEST_LOADING,
  SINGLEPOLL_FAIL,
} from "../actions/actionTypes";
import { route } from "../../ApiClient";
import { callApi } from "../index";

/* 
This can also be used to send a post request to the backend, but i choose not to use it, since the
imported callApi has been probably customized and made reusuable for making CRUD request.
---------------------------------------------------------------------------------------- */
export const create_poll = (data) => {
  let config = {
    headers: {
      Authorization: `Token ${data.token}`,
      "Content-Type": "application/json",
    },
  };

  return async (dispatch) => {
    try {
      dispatch({ type: REQUEST_LOADING });
      const response = await route.post(
        "polls/create-polls/",
        {
          poll_question: data.question,
          choices: data.choices,
          poll_expiration_date: data.date,
        },
        config
      );
      if (response.status === 201) {
        dispatch(get_polls());
        dispatch({ type: REQUEST_ERROR });
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ERROR,
        payload:
          error && error.response ? error.response : "Couldn't create the poll",
      });
    }
  };
};

/* Used for sending data to the backend to create a new poll 
export const create_poll = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REQUEST_LOADING });
      const response = await route.post(
        "polls/create-polls/",
        {
          poll_question: data.question,
          choices: data.choices,
          poll_expiration_date: data.date,
        },
        data.token
      );
      if (response.status === 200) {
        dispatch(get_polls());
        dispatch({ type: REQUEST_ERROR });
      }
    } catch (error) {
      dispatch({ type: REQUEST_ERROR });
      dispatch({
        type: REQUEST_ERROR,
        payload:
          error && error.response ? error.response : "Couldn't create the poll",
      });
    }
  };
};*/

export const get_polls = () => {
  return async (dispatch, getState) => {
    const token = getState().userAuth.token;
    let config = {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await route.get("polls/all-polls/", config);
      if (response) {
        dispatch({ type: ALLPOLL, payload: response.data });
      }
    } catch (error) {
      dispatch({ type: ALLPOLL_FAIL, payload: error.response });
    }
  };
};

export const get_single_poll = (data) => {
  return async (dispatch, getState) => {
    const token = getState().userAuth.token;
    let config = {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await route.get(`polls/all-polls/${data}/`, config);
      if (response) {
        dispatch({ type: SINGLEPOLL, payload: response.data });
      }
    } catch (error) {
      dispatch({ type: SINGLEPOLL_FAIL, payload: error.response });
    }
  };
};

export const post_currentuser_vote = (data) => {
  const { poll_id, choice_id } = data;
  return async (dispatch, getState) => {
    const token = getState().userAuth.token;
    let config = {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await route.post(
        `/polls/vote/${poll_id}/${choice_id}/`,
        {
          choice_id: choice_id,
          poll_id: poll_id,
        },
        config
      );
      if (response) {
        dispatch(get_polls());
      }
    } catch (error) {
      dispatch({
        type: VOTE_FAIL,
        payload: error.response.data.non_field_errors,
      });
    }
  };
};

export const post_delete_poll = (data) => {
  console.log(data, "from poll patch");
  return async (dispatch, getState) => {
    const token = getState().userAuth.token;
    let config = {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await route.delete(
        `/polls/all-polls/${data.poll_id}/`,
        config
      );
      if (response) {
        dispatch(get_polls());
      }
    } catch (error) {
      dispatch({
        type: VOTE_FAIL,
        payload: error.response.data.non_field_errors,
      });
    }
  };
};
