import { AsideNav } from "../../components/AsideNav/AsideNav";
import "./SingleVideo.css";
import { PlaylistModal } from "../../components/PlaylistModal/PlaylistModal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useVideoListing } from "../../context/VideosListingContext";
import { addToLikesService } from "../../services/likes-services";
import { usePlaylistUpdater } from "../../hooks/usePlaylistUpdater";
import { checkInPlaylist } from "../../helpers/checkInPlaylist";
import { useUserData } from "../../context/UserDataContext";
import { removeLikesService } from "../../services/likes-services";
export const SingleVideo = () => {
	const { videoListingState } = useVideoListing();
	const { data } = videoListingState;
	const [opened, setOpened] = useState(false);
	const params = useParams();
	const videoId = params.videoId;
	const video = data?.find((video) => video.id === videoId);
	const { userData } = useUserData();
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
		<div className="main-container">
			<AsideNav />
			<PlaylistModal val={opened} setOpened={setOpened} />
			<div className="grid-70-30">
				<div>
					<iframe
						width="100%"
						src={video?.src}
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						loading="lazy"
						className="video-player"
					></iframe>
					<div className="video-description">
						<h2>{video?.title}</h2>
						<span>{video?.views} • views</span>
						<div className="flex-row gap-l padding-tp-btm-s">
							<div className="flex-column" onClick={() => likeHandler()}>
								<i
									class={`${
										inLikedVideos ? "fas" : "far"
									}  fa-thumbs-up btn-icon`}
								></i>
								<span>Like</span>
							</div>
							<div className="flex-column">
								<i
									class="fas fa-folder-plus btn-icon"
									onClick={() => setOpened(true)}
								></i>
								<span>Save</span>
							</div>
							<div className="flex-column">
								<i class="far fa-bookmark btn-icon"></i>
								<span>Watch Later</span>
							</div>
						</div>
						<div className="creator padding-xs flex-row gap-xs ">
							<div class="avatar avatar-xs">
								<img
									class="avatar-round"
									src={video?.creatorProfile}
									alt="Avatar"
								/>
							</div>
							<div className=" text-s">{video?.creator}</div>
						</div>
					</div>
				</div>

				<div className="note-section padding-s flex-column  gap-s">
					<h3>Notes</h3>
					<form className="flex-column  gap-s">
						<input type="text" id="note-title" className="input" />
						<textarea
							name=""
							id=""
							cols="30"
							rows="10"
							className="input"
						></textarea>
						<div class="flex-row gap-xs">
							<button className="btn btn-primary-solid">Save</button>
							<button className="btn btn-primary-outline">Discard</button>
						</div>
					</form>
					<div className="note padding-xs">
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							Accusamus ratione placeat non culpa quibusdam cupiditate repellat
							dolore necessitatibus, quod illo.
						</p>
						<i class="far fa-clock"></i>
						<div class="flex-row gap-xs padding-tp-btm-xs">
							<i class="fas fa-pencil-alt"></i>
							<i class="fas fa-trash-alt"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
