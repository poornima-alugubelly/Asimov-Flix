import { actionTypes } from "./actionTypes";
export const userDataReducer = (state, action) => {
	const { SET_LIKES, SET_WATCHLATER } = actionTypes;

	switch (action.type) {
		case SET_LIKES:
			console.log(state, action, "in reducer");
			const likes = action.payload.data.likes;
			return {
				...state,
				likesPlaylist: [...likes],
			};
		case SET_WATCHLATER:
			console.log(state, action, "in reducer 2");
			console.log("action", action);
			const watchLater = action.payload.data.watchLater;
			return {
				...state,
				watchLaterPlaylist: [...watchLater],
			};
	}
};
