import { removeFromNotesService } from "../../../../services/notes-service";
import { useNotes } from "../../../../hooks/useNotes";
import { actionTypes } from "../../../../constants/actionTypes";
import { VideoNotesForm } from "../VideoNotesForm";
import { useState } from "react";
export const VideoNotesItem = ({ vidNotesItem, video }) => {
	const { SET_NOTES } = actionTypes;
	const [removeFromNotesServerCall] = useNotes(
		removeFromNotesService,
		video,
		"Note removed",
		SET_NOTES,
		vidNotesItem
	);
	const [editing, setEditing] = useState(false);
	return editing ? (
		<VideoNotesForm
			video={video}
			initFormVal={vidNotesItem}
			setEditing={setEditing}
		/>
	) : (
		<div className="note padding-xs">
			<h3>{vidNotesItem?.title}</h3>
			<p>{vidNotesItem?.description}</p>
			<i class="far fa-clock flex-align-center gap-xs">
				{new Date(vidNotesItem.updatedAt).toDateString()}
			</i>
			<div class="flex-align-center gap-xs padding-tp-btm-xs">
				<i
					class="fas fa-pencil-alt pointer"
					onClick={() => setEditing(true)}
				></i>
				<i
					class="fas fa-trash-alt pointer"
					type="button"
					onClick={() => removeFromNotesServerCall()}
				></i>
			</div>
		</div>
	);
};
