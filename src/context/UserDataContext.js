import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useState,
} from "react";
import { getLikesService } from "../services/likes-services";
import { actionTypes } from "../reducers/actionTypes";
import { userDataReducer } from "../reducers/userDataReducer";
import { useAuth } from "./AuthContext";
import { getWatchLaterService } from "../services/watchlist-services";

const userDataContext = createContext();
const useUserData = () => useContext(userDataContext);
const UserDataProvider = ({ children }) => {
	const [userData, userDataDispatch] = useReducer(userDataReducer, {
		likesPlaylist: [],
		watchLaterPlaylist: [],
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const { SET_LIKES, SET_WATCHLATER } = actionTypes;
	const { auth } = useAuth();

	useEffect(() => {
		auth.isAuthVL &&
			(async () => {
				setLoading(true);
				try {
					const res = await getLikesService(auth.tokenVL);
					console.log("in context", res);
					if (res.status === 200) {
						userDataDispatch({
							type: SET_LIKES,
							payload: { data: res.data },
						});
						setLoading(false);
					}
				} catch (err) {
					console.log("error", err);
				}
			})();
		auth.isAuthVL &&
			(async () => {
				setLoading(true);
				try {
					const res = await getWatchLaterService(auth.tokenVL);
					console.log("in context watchlater", res.data);
					if (res.status === 200) {
						userDataDispatch({
							type: SET_WATCHLATER,
							payload: { data: res.data },
						});
						setLoading(false);
					}
				} catch (err) {
					console.log("error", err);
				}
			})();
	}, [auth.isAuthVL]);

	return (
		<userDataContext.Provider
			value={{ userData, userDataDispatch, error, loading }}
		>
			{children}
		</userDataContext.Provider>
	);
};

export { UserDataProvider, useUserData };
