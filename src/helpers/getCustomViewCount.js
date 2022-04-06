export const getCustomViewCount = (viewCount) => {
	if (viewCount < 999) return viewCount;
	if (viewCount > 1000 && viewCount < 999000)
		return (viewCount / 1000).toFixed(1).replace(".0", "") + "K";
	if (viewCount > 1000000 && viewCount < 999000000)
		return (viewCount / 1000000).toFixed(1).replace(".0", "") + "M";
	if (viewCount > 1000000000 && viewCount < 999000000000)
		return (viewCount / 1000000000).toFixed(1).replace(".0", "") + "B";
};
