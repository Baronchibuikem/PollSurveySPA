import axios from "axios";

export const route = axios.create({
  baseURL : "http://pollsurvey.herokuapp.com/api/v1",
});

// export const route = axios.create({ baseURL: "http://127.0.0.1:8000/api/v1" })
