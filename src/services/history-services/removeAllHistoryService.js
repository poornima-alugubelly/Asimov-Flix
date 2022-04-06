import axios from "axios";
export const removeAllHistoryService = async (_, token) => {
	return await axios.delete("/api/user/history/all", {
		headers: { authorization: token },
	});
};
