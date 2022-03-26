import axios from "axios";

export const getVideoListingService = async () => {
	return await axios.get("/api/videos");
};
