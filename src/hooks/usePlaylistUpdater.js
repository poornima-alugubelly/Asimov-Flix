import { useState } from "react";
import { actionTypes } from "../reducers/actionTypes";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useUserData } from "../context/UserDataContext";
export const usePlaylistUpdater = (serviceFunction, video, action) => {
	const [updatingPlaylist, setUpdatingPlaylist] = useState(false);
	const { userDataDispatch } = useUserData();

	const { auth } = useAuth();
	const playlistUpdateCall = async () => {
		setUpdatingPlaylist(true);
		try {
			const res = await serviceFunction(video, auth.tokenVL);

			if (res.status === 201 || 200) {
				if (res.status === 201) toast.success("Added to playlist");
				if (res.status === 200) toast.success("Removed from playlist");
				setUpdatingPlaylist(false);
				userDataDispatch({
					type: action,
					payload: { data: res.data },
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
	return [playlistUpdateCall, updatingPlaylist, setUpdatingPlaylist];
};
