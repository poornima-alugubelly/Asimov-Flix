import { constants } from "../constants/constants";
export const sortByDate = (videosList, operation) => {
	const videos = [...videosList];
	const { NEWEST, OLDEST } = constants;
	if (operation === NEWEST)
		return videos.sort((a, b) => new Date(b.uploaded) - new Date(a.uploaded));
	else if (operation === OLDEST)
		return videos.sort((a, b) => new Date(a.uploaded) - new Date(b.uploaded));
	else return videos;
};
