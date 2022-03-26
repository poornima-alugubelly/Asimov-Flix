import axios from "axios";

export const getLikesService = async (token) => {
	return await axios.get("/api/user/likes", {
		headers: { authorization: token },
	});
};
