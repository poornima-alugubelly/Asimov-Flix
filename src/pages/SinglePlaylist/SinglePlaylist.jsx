import { useNavigate, useParams } from "react-router-dom";
import { AsideNav } from "../../components/AsideNav/AsideNav";
import { videos } from "../../backend/db/videos";
import { PlaylistVideo } from "./components/PlaylistVideo";
import { getPlaylistService } from "../../services/playlist-services";
import { useUserData } from "../../context/UserDataContext";
import { useCustomPlaylist } from "../../hooks/useCustomPlaylist";
export const SinglePlaylist = () => {
	const { playlistId } = useParams();
	const {
		userData: { playlists },
	} = useUserData();

	const playlist = playlists.find(
		(currPlaylist) => currPlaylist._id === playlistId
	);
	console.log("found playlist", playlist);
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
