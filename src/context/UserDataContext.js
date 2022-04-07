import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useState,
} from "react";
import { getLikesService } from "../services/likes-services";
import { actionTypes } from "../constants/actionTypes";
import { userDataReducer } from "../reducers/userDataReducer";
import { useAuth } from "./AuthContext";
import { getWatchLaterService } from "../services/watchlist-services";
import { getAllPlaylistService } from "../services/playlist-services";
import { getHistoryService } from "../services/history-services";
import { toast } from "react-toastify";
const userDataContext = createContext();
const useUserData = () => useContext(userDataContext);
const UserDataProvider = ({ children }) => {
	const [userData, userDataDispatch] = useReducer(userDataReducer, {
		likesPlaylist: [],
		watchLaterPlaylist: [],
		history: [],
		playlists: [],
		notes: [],
		theme: "light",
	});

	const [historyLoading, setHistoryLoading] = useState(false);
	const [likesLoading, setLikesLoading] = useState(false);
	const [watchLaterLoading, setWatchLaterLoading] = useState(false);
	const [otherPlaylistLoading, setOtherPlaylistLoading] = useState(false);

	const { SET_LIKES, SET_WATCHLATER, SET_PLAYLISTS, SET_HISTORY } = actionTypes;
	const { auth } = useAuth();

	useEffect(() => {
		auth.isAuthVL &&
			(async () => {
				setLikesLoading(true);
				try {
					const res = await getLikesService(auth.tokenVL);
					setLikesLoading(false);
					if (res.status === 200) {
						userDataDispatch({
							type: SET_LIKES,
							payload: { data: res.data },
						});
					}
				} catch (err) {
					toast.error(
						"Likes playlist count not be loaded please try after some time"
					);
				}
			})();
		auth.isAuthVL &&
			(async () => {
				setWatchLaterLoading(true);
				try {
					const res = await getWatchLaterService(auth.tokenVL);

					if (res.status === 200) {
						userDataDispatch({
							type: SET_WATCHLATER,
							payload: { data: res.data },
						});
						setWatchLaterLoading(false);
					}
				} catch (err) {
					toast.error(
						"Watch later playlist count not be loaded please try after some time"
					);
				}
			})();
		auth.isAuthVL &&
			(async () => {
				setOtherPlaylistLoading(true);
				try {
					const res = await getAllPlaylistService(auth.tokenVL);
					if (res.status === 200) {
						userDataDispatch({
							type: SET_PLAYLISTS,
							payload: { data: res.data },
						});
						setOtherPlaylistLoading(false);
					}
				} catch (err) {
					toast.error(
						"Playlists count not be loaded please try after some time"
					);
				}
			})();
		auth.isAuthVL &&
			(async () => {
				setHistoryLoading(true);
				try {
					const res = await getHistoryService(auth.tokenVL);
					if (res.status === 200) {
						userDataDispatch({
							type: SET_HISTORY,
							payload: { data: res.data },
						});
						setHistoryLoading(false);
					}
				} catch (err) {
					toast.error(
						"History playlist count not be loaded please try after some time"
					);
				}
			})();
	}, [auth.isAuthVL]);

	return (
		<userDataContext.Provider
			value={{
				userData,
				userDataDispatch,
				historyLoading,
				watchLaterLoading,
				likesLoading,
				otherPlaylistLoading,
			}}
		>
			{children}
		</userDataContext.Provider>
	);
};

export { UserDataProvider, useUserData };
