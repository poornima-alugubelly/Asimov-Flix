import axios from "axios";

export const addToPlaylistService = async (playlist, video, token) => {
	return await axios.post(
		`/api/user/playlists/${playlist._id}`,
		{ video },
		{ headers: { authorization: token } }
	);
};
