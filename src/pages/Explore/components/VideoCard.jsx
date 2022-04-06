import "./VideoCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PlaylistModal } from "../../../components/PlaylistModal/PlaylistModal";
import { useUserData } from "../../../context/UserDataContext";
import { checkInPlaylist } from "../../../helpers/checkInPlaylist";
import { usePlaylist } from "../../../hooks/usePlaylist";
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
export const VideoCard = ({ video }) => {
	const navigate = useNavigate();
	const {
		userData: { likesPlaylist, watchLaterPlaylist },
	} = useUserData();
	const [openedModal, setOpenedModal] = useState(false);
	const [openOptions, setOpenOptions] = useState(false);
	const { SET_LIKES, SET_WATCHLATER, SET_HISTORY } = actionTypes;
	const inLikedPlaylist = checkInPlaylist(video, likesPlaylist);
	const inWatchLaterPlaylist = checkInPlaylist(video, watchLaterPlaylist);
	const [addToLikesServerCall] = usePlaylist(
		addToLikesService,
		video,
		SET_LIKES,
		"Added to Likes"
	);
	const [removeFromLikesServerCall] = usePlaylist(
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
	const likeHandler = () =>
		inLikedPlaylist ? removeFromLikesServerCall() : addToLikesServerCall();
	const { auth } = useAuth();
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
					onClick={() => {
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
									<span className="text-xxs">{video.views} views</span>
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
							class="list-item flex-row gap-xs flex-align-center"
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
							class="list-item flex-row gap-xs"
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
