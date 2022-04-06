export const getSearchedVideos = (videos, userInput) => {
	const re = new RegExp(`${userInput}`, "i");

	return [...videos].filter((video) => re.test(video.title));
};
