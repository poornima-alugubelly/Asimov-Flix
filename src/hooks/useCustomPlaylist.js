import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useUserData } from "../context/UserDataContext";
export const useCustomPlaylist = (
	serviceFunction,
	playlist,
	action,
	video = null
) => {
	const [updatingPlaylist, setUpdatingPlaylist] = useState(false);
	const { userDataDispatch } = useUserData();
	const { auth } = useAuth();
	const customPlaylistUpdateCall = async () => {
		setUpdatingPlaylist(true);
		try {
			let res;
			if (video) {
				res = await serviceFunction(playlist, video, auth.tokenVL);
			} else {
				res = await serviceFunction(playlist, auth.tokenVL);
			}

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
	return [customPlaylistUpdateCall, updatingPlaylist, setUpdatingPlaylist];
};
