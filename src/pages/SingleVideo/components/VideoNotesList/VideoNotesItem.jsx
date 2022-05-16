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
	// console.log(vidNotesItem);
	const getTime = () => {
		const totalSeconds = vidNotesItem.playingTime;
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.floor(totalSeconds - minutes * 60);
		return `${minutes} : ${seconds}`;
	};
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
			<i class="far fa-clock flex-align-center gap-xs">{getTime()}</i>
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
