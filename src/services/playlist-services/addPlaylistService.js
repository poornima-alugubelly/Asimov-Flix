import axios from "axios";

export const addPlaylistService = async (playlist, token) => {
	return await axios.post(
		"/api/user/playlists",
		{ ...playlist },
		{ headers: { authorization: token } }
	);
};
