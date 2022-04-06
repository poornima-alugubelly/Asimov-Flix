import { useParams } from "react-router-dom";
import { AsideNav } from "../../components/AsideNav/AsideNav";
import { PlaylistVideo } from "./components/PlaylistVideo";
import { useUserData } from "../../context/UserDataContext";

export const SinglePlaylist = () => {
	const { playlistId } = useParams();
	const {
		userData: { playlists },
	} = useUserData();

	const playlist = playlists.find(
		(currPlaylist) => currPlaylist._id === playlistId
	);

	return (
		<div className="main-container">
			<AsideNav />

			<div className="padding-l">
				<h2>{playlist.title}</h2>
				<div className="padding-tp-btm-s">
					{playlist.videos.length === 0 ? (
						<h3>No videos added...</h3>
					) : (
						playlist.videos.map((video) => (
							<PlaylistVideo
								video={video}
								playlistTitle={`${playlist.title}`}
								playlist={playlist}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
};
