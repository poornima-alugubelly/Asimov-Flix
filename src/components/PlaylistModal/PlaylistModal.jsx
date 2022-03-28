import { useState, useEffect } from "react";
import "./PlaylistModal.css";
import { useUserData } from "../../context/UserDataContext";
import { addPlaylistService } from "../../services/playlist-services";
import { useCustomPlaylist } from "../../hooks/useCustomPlaylist";
import { actionTypes } from "../../reducers/actionTypes";
import { checkInPlaylist } from "../../helpers/checkInPlaylist";
import { CheckBox } from "./Checkbox";
export const PlaylistModal = ({ val, setOpened, video }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [adding, setAdding] = useState(false);
	const {
		userData: { playlists },
	} = useUserData();
	console.log("sent video", video);
	const { SET_PLAYLISTS } = actionTypes;
	const [playlistTitle, setPlaylistTitle] = useState("");
	const [addPlaylistServerCall] = useCustomPlaylist(
		addPlaylistService,
		{ playlist: { title: playlistTitle, videos: [{ ...video }] } },
		SET_PLAYLISTS
	);
	console.log("playlist", playlists);
	useEffect(() => setIsOpen(val));

	return (
		<>
			{isOpen && (
				<div>
					<div className="overlay"></div>
					<div className="modal-centered playlist-modal holo-bg">
						<div className="padding-xxs flex-space-between">
							<span>Save to...</span>{" "}
							<i
								class="far fa-times-circle"
								onClick={() => {
									setIsOpen(false);
									setOpened(false);
								}}
							></i>
						</div>
						<ul className="playlist-modal-body">
							{playlists.map((playlist) => {
								const exists = checkInPlaylist(video, playlist.videos);
								return (
									<li className="text-center playlist-modal-item gap-s">
										<CheckBox
											key={playlist._id}
											exists={exists}
											playlist={playlist}
											video={video}
										/>

										{playlist.title}
									</li>
								);
							})}
						</ul>
						{adding ? (
							<div className="flex-column gap-xs">
								<input
									className="input"
									placeholder="Enter Name"
									value={playlistTitle}
									onChange={(e) => setPlaylistTitle(e.target.value)}
								/>
								<span className="txt-high-light pointer" role="button">
									<b
										onClick={() => {
											addPlaylistServerCall();
											setAdding(false);
										}}
									>
										CREATE
									</b>
								</span>
							</div>
						) : (
							<div
								className="playlist-modal-item gap-xs"
								onClick={() => setAdding(true)}
							>
								<i class="fas fa-folder-plus"></i>
								<span className=" padding-xxs ">Create new playlist</span>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};
