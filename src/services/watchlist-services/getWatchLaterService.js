import axios from "axios";

export const getWatchLaterService = async (token) => {
	return await axios.get("/api/user/watchLater", {
		headers: { authorization: token },
	});
};
