import { createContext, useContext, useReducer, useEffect } from "react";
import { videoListingReducer } from "../reducers/videoListingReducer";
import { getVideoListingService } from "../services/getVideoListingService";
import { getCategoriesService } from "../services/getCategoriesService";
import { actionTypes } from "../reducers/actionTypes";
const VideoListingContext = createContext();
const useVideoListing = () => useContext(VideoListingContext);

const VideoListingProvider = ({ children }) => {
	const [videoListingState, videoListingDispatch] = useReducer(
		videoListingReducer,
		{
			data: [],
			categories: [],
			selectedCategory: "",
		}
	);

	const { LOAD_DATA } = actionTypes;
	useEffect(() => {
		(async () => {
			try {
				let res = await getVideoListingService();
				let resCat = await getCategoriesService();

				if (res.status === 200) {
					let videos = res.data.videos;
					let categories = resCat.data.categories;
					videoListingDispatch({
						type: LOAD_DATA,
						payload: { videos, categories },
					});
				}
			} catch (err) {
				console.log("error", err);
			}
		})();
	}, []);

	return (
		<VideoListingContext.Provider
			value={{ videoListingState, videoListingDispatch }}
		>
			{children}
		</VideoListingContext.Provider>
	);
};

export { useVideoListing, VideoListingProvider };
