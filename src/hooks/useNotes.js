import { useState } from "react";
import { useUserData } from "../context/UserDataContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
export const useNotes = (serviceFunction, video, msg, action, note) => {
	const { userDataDispatch } = useUserData();
	const { auth } = useAuth();
	const [updatingNotes, setUpdatingNotes] = useState(false);

	const notesUpdateCall = async () => {
		setUpdatingNotes(true);
		try {
			const res = await serviceFunction(video, note, auth.tokenVL);
			console.log(res);
			if (res.status === 201 || 200) {
				msg && toast.success(msg);
				setUpdatingNotes(false);
				userDataDispatch({
					type: action,
					payload: { data: res.data },
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
	return [notesUpdateCall, updatingNotes];
};
