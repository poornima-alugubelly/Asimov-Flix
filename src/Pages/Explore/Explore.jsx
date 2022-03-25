import { videos } from "../../backend/db/videos";
import { VideoCard } from "./components/VideoCard";
import { AsideNav } from "../../components/AsideNav/AsideNav";
export const Explore = () => {
	return (
		<div className="main-container">
			<AsideNav />
			<div className="grid-autofill-layout">
				{videos.map((video) => (
					<VideoCard video={video} />
				))}
			</div>
		</div>
	);
};
