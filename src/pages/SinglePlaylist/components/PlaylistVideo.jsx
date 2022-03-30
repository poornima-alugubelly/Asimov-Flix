import "./PlaylistVideo.css";
import { usePlaylist } from "../../../hooks/usePlaylist";
import { useCustomPlaylist } from "../../../hooks/useCustomPlaylist";
import { removeLikesService } from "../../../services/likes-services";
import { removeFromPlaylistService } from "../../../services/playlist-services";
import { removeWatchLaterService } from "../../../services/watchlist-services";
import { removeFromHistoryService } from "../../../services/history-services";
import { actionTypes } from "../../../reducers/actionTypes";

export const PlaylistVideo = ({ video, playlistTitle, playlist }) => {
	const { SET_LIKES, SET_PLAYLIST, SET_WATCHLATER, SET_HISTORY } = actionTypes;

	const [removeFromLikesServerCall] = usePlaylist(
		removeLikesService,
		video,
		SET_LIKES,
		"Removed from Likes"
	);
	console.log("history , playlists", playlist);
	const [removeFromPlaylistServerCall] = useCustomPlaylist(
		removeFromPlaylistService,
		playlist,
		SET_PLAYLIST,
		`Removed from ${playlist?.title}`,
		video
	);
	const [removeFromWatchLaterServiceCall] = usePlaylist(
		removeWatchLaterService,
		video,
		SET_WATCHLATER,
		"Removed from Watch Later"
	);
	const [removeFromHistoryServiceCall] = usePlaylist(
		removeFromHistoryService,
		video,
		SET_HISTORY,
		"Removed from History"
	);
	console.log(playlistTitle);
	const removeVideoHandler = () => {
		switch (playlistTitle) {
			case "Likes":
				removeFromLikesServerCall();
				break;
			case "Watch Later":
				removeFromWatchLaterServiceCall();
				break;
			case "History":
				removeFromHistoryServiceCall();
				break;
			default:
				removeFromPlaylistServerCall();
		}
	};
	return (
		<div class="card playlist-video padding-s pointer">
			<div class="img-container">
				<img src={video.thumbnail} alt="product image" class="img-responsive" />
			</div>
			<div className="card-content ">
				<h3>{video.title}</h3>

				<span className="text-xs">{video.creator}</span>
			</div>
			<div class="flex-center">
				<i
					class="fas fa-trash"
					role="button"
					onClick={() => removeVideoHandler()}
				></i>
			</div>
		</div>
	);
};
