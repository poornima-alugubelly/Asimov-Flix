import axios from "axios";

export const getPlaylistService = async (playlistId, token) => {
	return await axios.get(`/api/user/playlists/${playlistId}`, {
		headers: { authorization: token },
	});
};
