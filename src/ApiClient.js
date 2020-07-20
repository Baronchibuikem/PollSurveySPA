import axios from "axios";

// export default axios.create({
// 	baseURL:
// 		process.env.NODE_ENV === "development"
// 			? "http://127.0.0.1:8000/api/v1/"
// 			: "http://pollsurvey.herokuapp.com/"
// });

export default axios.create({
	baseURL: "http://pollsurvey.herokuapp.com/api/v1/"
});