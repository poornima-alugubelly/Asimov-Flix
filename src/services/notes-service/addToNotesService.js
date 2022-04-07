import axios from "axios";

export const addToNotesService = async (video, note, token) => {
	return await axios.post(
		`/api/user/notes/${video._id}`,
		{ note },
		{
			headers: { authorization: token },
		}
	);
};
