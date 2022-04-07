import { Response } from "miragejs";
import { requiresAuth, formatDate } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

// export const getNotesHandler = function (schema, request) {
//   const user = requiresAuth.call(this, request);
//   try {
//     if (!user) {
//       return new Response(
//         404,
//         {},
//         {
//           errors: ["The email you entered is not Registered. Not Found error"],
//         }
//       );
//     }
//     const { videoId } = request.params;
//     const video = schema.videos.findBy({ _id: videoId }).attrs;
//     return new Response(200, {}, { notes: video.notes });
//   } catch (error) {
//     return new Response(
//       500,
//       {},
//       {
//         error,
//       }
//     );
//   }
// };

export const addItemToNotesHandler = function (schema, request) {
	const user = requiresAuth.call(this, request);
	if (user) {
		const { videoId } = request.params;
		const { note } = JSON.parse(request.requestBody);

		const video = schema.videos.findBy({ _id: videoId }).attrs;

		const videoNotes = user.notes.find(
			(currNote) => currNote._id === video._id
		);
		let updatedNotes = "";
		if (videoNotes) {
			updatedNotes = user.notes.map((currNote) => {
				if (currNote._id === video._id)
					currNote.vidNotes.push({
						_id: uuid(),
						...note,
						updatedAt: formatDate(),
					});
				return currNote;
			});

			this.db.users.update({ _id: user._id }, { notes: updatedNotes });
		} else
			user.notes.push({
				_id: video._id,
				vidNotes: [{ _id: uuid(), ...note, updatedAt: formatDate() }],
			});

		return new Response(201, {}, { notes: user.notes });
	}
	return new Response(
		404,
		{},
		{
			errors: ["The email you entered is not Registered. Not Found error"],
		}
	);
};

export const removeItemFromNotesHandler = function (schema, request) {
	const user = requiresAuth.call(this, request);
	if (user) {
		const { videoId } = request.params;

		const { note } = JSON.parse(request.requestBody);

		const video = schema.videos.findBy({ _id: videoId }).attrs;

		const updatedNotes = user.notes.map((currNote) => {
			if (currNote._id === video._id) {
				const newVidNotes = currNote.vidNotes.filter(
					(vidNote) => vidNote._id !== note._id
				);

				return { ...currNote, vidNotes: newVidNotes };
			}

			return currNote;
		});

		this.db.users.update({ _id: user._id }, { notes: updatedNotes });

		return new Response(200, {}, { notes: updatedNotes });
	}
	return new Response(
		404,
		{},
		{
			errors: ["The email you entered is not Registered. Not Found error"],
		}
	);
};

export const updateNoteHandler = function (schema, request) {
	const user = requiresAuth.call(this, request);

	if (user) {
		const { videoId } = request.params;

		const { note } = JSON.parse(request.requestBody);

		const video = schema.videos.findBy({ _id: videoId }).attrs;

		const updatedNotes = user.notes.map((currNote) => {
			if (currNote._id === video._id) {
				const newVidNotes = currNote.vidNotes.map((vidNote) => {
					if (vidNote._id === note._id) {
						return {
							...vidNote,
							title: note.title,
							description: note.description,
						};
					}

					return vidNote;
				});
				return { ...currNote, vidNotes: newVidNotes };
			}
			return currNote;
		});
		this.db.users.update({ _id: user._id }, { notes: updatedNotes });

		return new Response(200, {}, { notes: updatedNotes });
	}
	return new Response(
		404,
		{},
		{
			errors: ["The email you entered is not Registered. Not Found error"],
		}
	);
};
