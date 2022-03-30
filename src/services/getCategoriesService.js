import axios from "axios";

export const getCategoriesService = async () => {
	return await axios.get("/api/categories");
};
