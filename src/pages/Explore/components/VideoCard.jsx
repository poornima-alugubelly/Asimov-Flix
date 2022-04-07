import "./VideoCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PlaylistModal } from "../../../components/PlaylistModal/PlaylistModal";
import { useUserData } from "../../../context/UserDataContext";
import { checkInPlaylist } from "../../../helpers/checkInPlaylist";
import { usePlaylist } from "../../../hooks/usePlaylist";
import { useVideoListing } from "../../../context/VideosListingContext";
import {
	addToLikesService,
	removeLikesService,
} from "../../../services/likes-services";
import { useAuth } from "../../../context/AuthContext";
import { actionTypes } from "../../../constants/actionTypes";
import {
	addToWatchLaterService,
	removeWatchLaterService,
} from "../../../services/watchlist-services";
import { addToHistoryService } from "../../../services/history-services";
import { getCustomViewCount } from "../../../helpers/getCustomViewCount";
import { updateVideoCountService } from "../../../services/updateVideoCountService";
export const VideoCard = ({ video }) => {
	const navigate = useNavigate();
	const {
		userData: { likesPlaylist, watchLaterPlaylist },
	} = useUserData();
	const { videoListingDispatch } = useVideoListing();
	const [openedModal, setOpenedModal] = useState(false);
	const [openOptions, setOpenOptions] = useState(false);
	const { auth } = useAuth();
	const { SET_LIKES, SET_WATCHLATER, SET_HISTORY, SET_VIDEOS } = actionTypes;
	const inLikedPlaylist = checkInPlaylist(video, likesPlaylist);
	const inWatchLaterPlaylist = checkInPlaylist(video, watchLaterPlaylist);

	const [addToLikesServerCall, addingToLikes] = usePlaylist(
		addToLikesService,
		video,
		SET_LIKES,
		"Added to Likes"
	);
	const [removeFromLikesServerCall, removingFromLikes] = usePlaylist(
		removeLikesService,
		video,
		SET_LIKES,
		"Removed from Likes"
	);

	const [addToWatchLaterServerCall, addingToWatchLater] = usePlaylist(
		addToWatchLaterService,
		video,
		SET_WATCHLATER,
		"Added to Watch Later"
	);
	const [removeFromWatchLaterServerCall, removingFromWatchLater] = usePlaylist(
		removeWatchLaterService,
		video,
		SET_WATCHLATER,
		"Removed from Watch Later"
	);

	const [addToHistoryServerCall] = usePlaylist(
		addToHistoryService,
		video,
		SET_HISTORY,
		""
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

	const likeHandler = () =>
		inLikedPlaylist ? removeFromLikesServerCall() : addToLikesServerCall();

	const watchLaterHandler = () =>
		inWatchLaterPlaylist
			? removeFromWatchLaterServerCall()
			: addToWatchLaterServerCall();

	return (
		<>
			<div className="card flex-column ">
				<PlaylistModal
					val={openedModal}
					setOpened={setOpenedModal}
					video={video}
					key={video.id}
				/>
				<div
					className="img-container"
					onClick={async () => {
						updateVideoCountServerCall();
						addToHistoryServerCall();
						navigate(`/explore/${video.id}`);
					}}
				>
					<img src={video.thumbnail} className="img-responsive" />
				</div>
				<div className="video-content gap-s ">
					<div className="flex-row gap-s">
						<div class="avatar avatar-xs">
							<img
								class="avatar-round"
								src={video.creatorProfile}
								alt="Avatar"
							/>
						</div>
						<div className="flex-column gap-xs">
							<strong class="video-title">{video.title} </strong>
							<div className="flex-column">
								<div className="flex-row gap-xs flex-align-center">
									<span className="text-xxs">
										{getCustomViewCount(video.views)} views
									</span>
									<span>•</span>
									<span className="text-xxs">
										{new Date(video.uploaded).toDateString().slice(4)}
									</span>
								</div>

								<span className="text-xxs">{video.creator}</span>
							</div>
						</div>
					</div>

					<i
						class="fas fa-ellipsis-v"
						onClick={() => setOpenOptions(!openOptions)}
					></i>
				</div>
				{openOptions && (
					<ul className="video-option-container">
						<li
							class={`list-item flex-row gap-xs flex-align-center ${
								addingToLikes || removingFromLikes ? "btn-disabled" : ""
							}`}
							onClick={
								auth.isAuthVL ? () => likeHandler() : () => navigate("/login")
							}
						>
							{inLikedPlaylist ? (
								<i class="far fa-check-circle"></i>
							) : (
								<i class="fas fa-plus"></i>
							)}
							Liked Videos
						</li>
						<li
							class={`list-item flex-row gap-xs ${
								addingToWatchLater || removingFromWatchLater
									? "btn-disabled"
									: ""
							}`}
							onClick={
								auth.isAuthVL
									? () => watchLaterHandler()
									: () => navigate("/login")
							}
						>
							{inWatchLaterPlaylist ? (
								<i class="far fa-check-circle"></i>
							) : (
								<i class="fas fa-plus"></i>
							)}
							Watch Later
						</li>
						<li
							class="list-item flex-row gap-xs"
							onClick={() => {
								if (auth.isAuthVL) {
									setOpenOptions(false);
									setOpenedModal(true);
								} else {
									navigate("/login");
								}
							}}
						>
							<i class="fas fa-plus"></i> other playlist
						</li>
					</ul>
				)}
			</div>
		</>
	);
};
