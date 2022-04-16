import "./PlaylistVideo.css";
import { useNavigate } from "react-router-dom";
import { usePlaylist } from "../../../hooks/usePlaylist";
import { useCustomPlaylist } from "../../../hooks/useCustomPlaylist";
import { removeLikesService } from "../../../services/likes-services";
import { removeFromPlaylistService } from "../../../services/playlist-services";
import { removeWatchLaterService } from "../../../services/watchlist-services";
import { removeFromHistoryService } from "../../../services/history-services";
import { addToHistoryService } from "../../../services/history-services";
import { updateVideoCountService } from "../../../services/updateVideoCountService";
import { actionTypes } from "../../../constants/actionTypes";
import { useVideoListing } from "../../../context/VideosListingContext";

export const PlaylistVideo = ({ video, playlistTitle, playlist }) => {
	const navigate = useNavigate();
	const { videoListingDispatch } = useVideoListing();
	const { SET_LIKES, SET_PLAYLIST, SET_WATCHLATER, SET_HISTORY, SET_VIDEOS } =
		actionTypes;

	const [removeFromLikesServerCall] = usePlaylist(
		removeLikesService,
		video,
		SET_LIKES,
		"Removed from Likes"
	);

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

	const updateVideoCountServerCall = async () => {
		try {
			const res = await updateVideoCountService(video);
			if (res.status === 200) {
				const videos = res.data.videos;
				videoListingDispatch({
					type: SET_VIDEOS,
					payload: { videos },
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	const [addToHistoryServerCall] = usePlaylist(
		addToHistoryService,
		video,
		SET_HISTORY,
		""
	);

	const removeVideoHandler = (e) => {
		e.stopPropagation();
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
		<div
			class="card playlist-video padding-s pointer"
			onClick={async () => {
				updateVideoCountServerCall();
				addToHistoryServerCall();
				navigate(`/explore/${video.id}`);
			}}
		>
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
					onClick={(e) => removeVideoHandler(e)}
				></i>
			</div>
		</div>
	);
};
