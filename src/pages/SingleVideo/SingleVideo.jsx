import { AsideNav } from "../../components/AsideNav/AsideNav";
import "./SingleVideo.css";
import { useState } from "react";
import { PlaylistModal } from "../../components/PlaylistModal/PlaylistModal";
import { useNavigate, useParams } from "react-router-dom";
import { useVideoListing } from "../../context/VideosListingContext";
import { addToLikesService } from "../../services/likes-services";
import { usePlaylist } from "../../hooks/usePlaylist";
import { checkInPlaylist } from "../../helpers/checkInPlaylist";
import { useUserData } from "../../context/UserDataContext";
import { removeLikesService } from "../../services/likes-services";
import { useAuth } from "../../context/AuthContext";
import {
	addToWatchLaterService,
	removeWatchLaterService,
} from "../../services/watchlist-services";
import { actionTypes } from "../../constants/actionTypes";
import { VideoNotesList } from "./components/VideoNotesList/VideoNotesList";
import { VideoNotesForm } from "./components/VideoNotesForm";
export const SingleVideo = () => {
	const {
		videoListingState: { data },
	} = useVideoListing();
	const [opened, setOpened] = useState(false);
	const { SET_LIKES, SET_WATCHLATER, SET_NOTES } = actionTypes;
	const { videoId } = useParams();
	const video = data?.find((video) => video.id === videoId);
	const {
		userData: { likesPlaylist, watchLaterPlaylist, notes },
	} = useUserData();
	const vidNotesList = notes?.filter((note) => note._id === video._id)[0]
		?.vidNotes;
	const {
		auth: { isAuthVL },
	} = useAuth();
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

	const likeHandler = () =>
		inLikedPlaylist ? removeFromLikesServerCall() : addToLikesServerCall();
	const watchLaterHandler = () =>
		inWatchLaterPlaylist
			? removeFromWatchLaterServerCall()
			: addToWatchLaterServerCall();
	const navigate = useNavigate();

	return (
		<div className="main-container">
			<AsideNav />

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
						<span>
							{new Intl.NumberFormat("en-US").format(video?.views)} • views
						</span>
						<div className="flex-row gap-l padding-tp-btm-s">
							<div
								className="flex-column"
								onClick={
									isAuthVL ? () => likeHandler() : () => navigate("/login")
								}
							>
								<i
									class={`${
										inLikedPlaylist ? "fas" : "far"
									}  fa-thumbs-up btn-icon  ${
										addingToLikes || removingFromLikes ? "btn-disabled" : ""
									}  `}
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
							<div
								className="flex-column"
								onClick={
									isAuthVL
										? () => watchLaterHandler()
										: () => navigate("/login")
								}
							>
								<i
									class={`${
										inWatchLaterPlaylist ? "fas" : "far"
									}  fa-bookmark btn-icon  ${
										addingToWatchLater || removingFromWatchLater
											? "btn-disabled"
											: ""
									}  `}
								></i>

								<span>Watch Later</span>
							</div>
							<PlaylistModal val={opened} setOpened={setOpened} video={video} />
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
					<VideoNotesForm
						video={video}
						initFormVal={{ title: "", description: "" }}
					/>
					<VideoNotesList vidNotesList={vidNotesList} video={video} />
				</div>
			</div>
		</div>
	);
};
