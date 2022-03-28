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
import { actionTypes } from "../../../reducers/actionTypes";
import {
	addToWatchLaterService,
	removeWatchLaterService,
} from "../../../services/watchlist-services";

export const VideoCard = ({ video }) => {
	const navigate = useNavigate();
	const {
		userData: { likesPlaylist, watchLaterPlaylist },
	} = useUserData();
	const [openedModal, setOpenedModal] = useState(false);
	const [openOptions, setOpenOptions] = useState(false);
	const { SET_LIKES, SET_WATCHLATER } = actionTypes;
	const inLikedPlaylist = checkInPlaylist(video, likesPlaylist);
	const inWatchLaterPlaylist = checkInPlaylist(video, watchLaterPlaylist);
	const [addToLikesServerCall] = usePlaylist(
		addToLikesService,
		video,
		SET_LIKES
	);
	const [removeFromLikesServerCall] = usePlaylist(
		removeLikesService,
		video,
		SET_LIKES
	);

	const [addToWatchLaterServerCall, addingToWatchLater] = usePlaylist(
		addToWatchLaterService,
		video,
		SET_WATCHLATER
	);
	const [removeFromWatchLaterServerCall, removingFromWatchLater] = usePlaylist(
		removeWatchLaterService,
		video,
		SET_WATCHLATER
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
				/>
				<div
					className="img-container"
					onClick={() => navigate(`/explore/${video.id}`)}
				>
					<img src={video.thumbnail} className="img-responsive" />
				</div>
				<div className="video-content gap-s ">
					<div class="avatar avatar-xs">
						<img class="avatar-round" src={video.creatorProfile} alt="Avatar" />
					</div>
					<div className="flex-column gap-xs">
						<strong class="video-title">{video.title} </strong>
						<div className="flex-column">
							<span className="text-xxs">{video.views} views</span>
							<span className="text-xxs">{video.creator}</span>
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
							class="list-item flex-row gap-xs"
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
							onClick={() => setOpenedModal(true)}
						>
							<i class="fas fa-plus"></i> other playlist
						</li>
					</ul>
				)}
			</div>
		</>
	);
};
