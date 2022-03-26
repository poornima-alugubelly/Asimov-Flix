import { useVideoListing } from "../../context/VideosListingContext";
import { VideoCard } from "./components/VideoCard";
import { AsideNav } from "../../components/AsideNav/AsideNav";

export const Explore = () => {
	const { videoListingState } = useVideoListing();
	const { data } = videoListingState;

	return (
		<div className="main-container">
			<AsideNav />
			<div className="grid-autofill-layout">
				{data?.map((video) => (
					<VideoCard video={video} />
				))}
			</div>
		</div>
	);
};
