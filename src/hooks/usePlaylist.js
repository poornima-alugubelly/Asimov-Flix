import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useUserData } from "../context/UserDataContext";
export const usePlaylist = (serviceFunction, video, action, msg) => {
	const [updatingPlaylist, setUpdatingPlaylist] = useState(false);
	const { userDataDispatch } = useUserData();
	const { auth } = useAuth();

	const playlistUpdateCall = async () => {
		setUpdatingPlaylist(true);
		try {
			const res = await serviceFunction(video, auth.tokenVL);

			if (res.status === 201 || 200) {
				msg && toast.success(msg);
				setUpdatingPlaylist(false);
				userDataDispatch({
					type: action,
					payload: { data: res.data },
				});
			}
		} catch (err) {
			toast.error("There was a problem please try later");
		}
	};
	return [playlistUpdateCall, updatingPlaylist];
};
