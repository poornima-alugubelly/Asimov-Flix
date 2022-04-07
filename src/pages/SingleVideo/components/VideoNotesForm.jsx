import { useState } from "react";
import { actionTypes } from "../../../constants/actionTypes";
import { useNotes } from "../../../hooks/useNotes";
import {
	addToNotesService,
	updateNoteService,
} from "../../../services/notes-service";
export const VideoNotesForm = ({ video, initFormVal, setEditing = null }) => {
	const { SET_NOTES } = actionTypes;
	const [formVal, setFormVal] = useState(initFormVal);
	const [addToNotesServerCall, addingNotes] = useNotes(
		addToNotesService,
		video,
		"Notes updated",
		SET_NOTES,
		formVal
	);
	const [updateNoteServerCall, updatingNotes] = useNotes(
		updateNoteService,
		video,
		"Notes updated",
		SET_NOTES,
		formVal
	);
	const changeHandler = (e) => {
		const { name, value } = e.target;
		setFormVal((prev) => ({ ...prev, [name]: value }));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (setEditing) {
			console.log(setEditing);
			setEditing(false);
			updateNoteServerCall();
		} else {
			addToNotesServerCall();
		}
	};

	return (
		<form className="flex-column  gap-s" onSubmit={(e) => submitHandler(e)}>
			<input
				type="text"
				id="note-title"
				name="title"
				value={formVal.title}
				className="input"
				onChange={(e) => changeHandler(e)}
			/>
			<textarea
				name="description"
				value={formVal.description}
				cols="30"
				rows="10"
				className="input"
				onChange={(e) => changeHandler(e)}
			></textarea>
			<div class="flex-row gap-xs">
				<button
					className={`{${
						addingNotes || updatingNotes ? "btn-disabled" : ""
					}?} btn btn-primary-solid`}
				>
					Save
				</button>
				<button className="btn btn-primary-outline">Discard</button>
			</div>
		</form>
	);
};
