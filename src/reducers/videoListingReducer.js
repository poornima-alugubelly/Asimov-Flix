import { actionTypes } from "./actionTypes";
export const videoListingReducer = (state, action) => {
	const { LOAD_DATA, FILTER } = actionTypes;
	switch (action.type) {
		case LOAD_DATA:
			return {
				...state,
				data: action.payload.videos,
				categories: action.payload.categories,
			};
		case FILTER:
			return {
				...state,
				selectedCategory: action.payload.category,
			};
	}
};
