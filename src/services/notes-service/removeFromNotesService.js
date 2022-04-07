import axios from "axios";

export const removeFromNotesService = async (video, note, token) => {
	return await axios.post(
		`/api/user/notes/delete/${video._id}`,
		{ note },
		{
			headers: { authorization: token },
		}
	);
};
