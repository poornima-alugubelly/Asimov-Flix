import "./VideoCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PlaylistModal } from "../../../components/PlaylistModal/PlaylistModal";
import { useUserData } from "../../../context/UserDataContext";
import { checkInPlaylist } from "../../../helpers/checkInPlaylist";
import { usePlaylistUpdater } from "../../../hooks/usePlaylistUpdater";
import {
	addToLikesService,
	removeLikesService,
} from "../../../services/likes-services";

export const VideoCard = ({ video }) => {
	const navigate = useNavigate();
	const { userData } = useUserData();
	const [openedModal, setOpenedModal] = useState(false);
	const [openOptions, setOpenOptions] = useState(false);
	const { likesPlaylist } = userData;
	const inLikedVideos = checkInPlaylist(video, likesPlaylist);
	const [addToLikesServerCall] = usePlaylistUpdater(addToLikesService, video);
	const [removeFromLikesServerCall] = usePlaylistUpdater(
		removeLikesService,
		video
	);
	const likeHandler = () =>
		inLikedVideos ? removeFromLikesServerCall() : addToLikesServerCall();
	return (
		<>
			<div className="card flex-column ">
				<PlaylistModal val={openedModal} setOpened={setOpenedModal} />
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
						<li class="list-item flex-row gap-xs" onClick={() => likeHandler()}>
							{inLikedVideos ? (
								<i class="far fa-check-circle"></i>
							) : (
								<i class="fas fa-plus"></i>
							)}
							Liked Videos
						</li>
						<li class="list-item flex-row gap-xs">
							<i class="fas fa-plus"></i> Watch Later
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
