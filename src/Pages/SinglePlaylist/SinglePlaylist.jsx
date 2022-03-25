import { AsideNav } from "../../components/AsideNav/AsideNav";
import { videos } from "../../backend/db/videos";
import { PlaylistVideo } from "./components/PlaylistVideo";
export const SinglePlaylist = () => {
	return (
		<div className="main-container">
			<AsideNav />

			<div className="padding-l">
				<h2>Saved Playlists</h2>
				<div>
					{videos.map((video) => (
						<PlaylistVideo video={video} />
					))}
				</div>
			</div>
		</div>
	);
};
