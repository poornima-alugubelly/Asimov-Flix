import axios from "axios";

export const updateVideoCountService = async (video) => {
	return await axios.post(`/api/video/${video._id}`);
};
