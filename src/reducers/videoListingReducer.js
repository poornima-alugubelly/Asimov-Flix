import { actionTypes } from "../constants/actionTypes";
export const videoListingReducer = (state, action) => {
	const { LOAD_DATA, FILTER, SORT_VIDEOS, SEARCH, SET_VIDEOS } = actionTypes;
	switch (action.type) {
		case LOAD_DATA:
			return {
				...state,
				data: action.payload.videos,
				categories: action.payload.categories,
			};
		case SET_VIDEOS:
			return {
				...state,
				data: action.payload.videos,
			};
		case FILTER:
			return {
				...state,
				selectedCategory: action.payload.category,
			};
		case SORT_VIDEOS:
			return {
				...state,
				sortBy: action.payload.sortBy,
			};
		case SEARCH: {
			return {
				...state,
				searchText: action.payload.searchInput,
			};
		}
		default:
			return state;
	}
};
