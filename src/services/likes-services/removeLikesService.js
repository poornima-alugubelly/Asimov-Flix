import axios from "axios";
export const removeLikesService = async (video, token) => {
	return await axios.delete(`/api/user/likes/${video._id}`, {
		headers: { authorization: token },
	});
};
