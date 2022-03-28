import axios from "axios";
export const removeAllHistoryService = async (token) => {
	return await axios.delete("/api/user/history", {
		headers: { authorization: token },
	});
};
