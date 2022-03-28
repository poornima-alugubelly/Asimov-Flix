import axios from "axios";
export const removePlaylistService = async (playlist, token) => {
	return await axios.delete(`/api/user/playlists/${playlist._id}`, {
		headers: { authorization: token },
	});
};
