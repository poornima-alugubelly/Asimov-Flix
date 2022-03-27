import axios from "axios";
export const removeWatchLaterService = async (video, token) => {
	return await axios.delete(`/api/user/watchLater/${video._id}`, {
		headers: { authorization: token },
	});
};
