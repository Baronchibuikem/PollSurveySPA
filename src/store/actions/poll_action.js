import { ALLPOLL, CREATEPOLL, SINGLEPOLL } from "../actions/actionTypes"
import route from "../../ApiClient";

export const create_poll = () => {
    return async dispatch => {
        const response = await projectsApi.get("/departments/nurses/");
        dispatch({ type: ALLPOLL, payload: response.data });
    };
};