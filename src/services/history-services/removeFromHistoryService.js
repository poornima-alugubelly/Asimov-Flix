import axios from "axios";
export const removeFromHistoryService = async (video, token) => {
	return await axios.delete(`/api/user/history/${video._id}`, {
		headers: { authorization: token },
	});
};
