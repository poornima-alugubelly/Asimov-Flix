import axios from "axios";

export const addToWatchLaterService = async (video, token) => {
	return await axios.post(
		"/api/user/watchLater/",
		{ video },
		{ headers: { authorization: token } }
	);
};
