import axios from "axios";

export const addToHistoryService = async (video, token) => {
	return await axios.post(
		"/api/user/history",
		{ video },
		{ headers: { authorization: token } }
	);
};
