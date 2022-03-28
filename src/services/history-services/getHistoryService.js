import axios from "axios";

export const getHistoryService = async (token) => {
	return await axios.get("/api/user/history", {
		headers: { authorization: token },
	});
};
