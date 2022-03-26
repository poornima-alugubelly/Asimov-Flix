import { actionTypes } from "./actionTypes";
export const videoListingReducer = (state, action) => {
	const { LOAD_DATA, SET_LIKES } = actionTypes;
	switch (action.type) {
		case LOAD_DATA:
			return {
				...state,
				data: action.payload.videos,
			};
	}
};
