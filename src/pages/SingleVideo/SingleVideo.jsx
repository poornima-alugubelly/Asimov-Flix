import { AsideNav } from "../../components/AsideNav/AsideNav";
import "./SingleVideo.css";
import ReactPlayer from "react-player/youtube";
import { useState, useRef, useEffect } from "react";
import { PlaylistModal } from "../../components/PlaylistModal/PlaylistModal";
import { useNavigate, useParams } from "react-router-dom";
import { useVideoListing } from "../../context/VideosListingContext";
import { addToLikesService } from "../../services/likes-services";
import { usePlaylist } from "../../hooks/usePlaylist";
import { checkInPlaylist } from "../../helpers/checkInPlaylist";
import { useUserData } from "../../context/UserDataContext";
import { removeLikesService } from "../../services/likes-services";
import { addToHistoryService } from "../../services/history-services";
import { updateVideoCountService } from "../../services/updateVideoCountService";
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
		videoListingDispatch,
	} = useVideoListing();
	const videoRef = useRef();
	const [opened, setOpened] = useState(false);
	const { SET_LIKES, SET_WATCHLATER, SET_VIDEOS, SET_HISTORY } = actionTypes;
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
				console.log("view", videos);
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
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthVL && video) {
			addToHistoryServerCall();
			updateVideoCountServerCall();
		}
	}, []);

	return (
		<div className="main-container">
			<AsideNav />
			<div className="grid-70-30">
				<div>
					<ReactPlayer
						url={video?.src}
						controls
						width="100%"
						playing={true}
						ref={videoRef}
					/>
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
						videoRef={videoRef}
						video={video}
						initFormVal={{
							title: "",
							description: "",
						}}
					/>
					<VideoNotesList vidNotesList={vidNotesList} video={video} />
				</div>
			</div>
		</div>
	);
};
