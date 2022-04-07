import axios from "axios";

export const updateNoteService = async (video, note, token) => {
	return await axios.post(
		`/api/user/notes/update/${video._id}`,
		{ note },
		{
			headers: { authorization: token },
		}
	);
};
