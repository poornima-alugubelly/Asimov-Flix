import { useNavigate } from "react-router-dom";
import { actionTypes } from "../../../reducers/actionTypes";
import { useCustomPlaylist } from "../../../hooks/useCustomPlaylist";
import { removePlaylistService } from "../../../services/playlist-services";
export const PlaylistCard = ({ playlist }) => {
	const navigate = useNavigate();
	const { SET_PLAYLISTS } = actionTypes;
	const [removeFromPlaylistServerCall] = useCustomPlaylist(
		removePlaylistService,
		playlist,
		SET_PLAYLISTS
	);

	return (
		<div className="card card-vertical ">
			<div
				className="img-container playlist-card-img"
				onClick={() => navigate(`/${playlist._id}`)}
			>
				<img
					src={
						playlist.videos.length === 0
							? "/assets/novideos.png"
							: playlist.videos[0].thumbnail
					}
					className="img-responsive"
				/>
				<div className="card-overlay">{playlist.videos.length}</div>
			</div>

			<div className="flex-space-between playlist-card-footer">
				<span className="text-s">{playlist.title}</span>
				<i
					class="fas fa-trash-alt "
					onClick={() => removeFromPlaylistServerCall()}
				></i>
			</div>
		</div>
	);
};
