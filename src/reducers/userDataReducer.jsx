import { actionTypes } from "./actionTypes";
export const userDataReducer = (state, action) => {
	const { SET_LIKES, SET_WATCHLATER } = actionTypes;

	switch (action.type) {
		case SET_LIKES:
			console.log(state, action, "in reducer");
			return {
				...state,
				likesPlaylist: [...action.payload.likesPlaylist],
			};
		case SET_WATCHLATER:
			console.log(state, action, "in reducer 2");
			return {
				...state,
				watchLaterPlaylist: [...action.payload.watchLaterPlaylist],
			};
	}
};
