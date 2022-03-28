import axios from "axios";

export const getAllPlaylistService = async (token) => {
	return await axios.get("/api/user/playlists", {
		headers: { authorization: token },
	});
};
