import "./VideoCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PlaylistModal } from "../../../components/PlaylistModal/PlaylistModal";
export const VideoCard = ({ video }) => {
	const navigate = useNavigate();
	const [opened, setOpened] = useState(false);
	return (
		<div className="card flex-column">
			<PlaylistModal val={opened} setOpened={setOpened} />
			<div className="img-container" onClick={() => navigate("/singleVideo")}>
				<img src={video.thumbnail} className="img-responsive" />
			</div>
			<div className="video-content gap-s padding-tp-btm-xs ">
				<div class="avatar avatar-xs">
					<img class="avatar-round" src={video.creatorProfile} alt="Avatar" />
				</div>
				<div className="flex-column">
					<strong class="video-title">{video.title} </strong>
					<span className="text-xxs">{video.creator}</span>
					<span className="text-xxs">{video.views} views</span>
				</div>
				<i class="fas fa-ellipsis-v" onClick={() => setOpened(true)}></i>
			</div>
		</div>
	);
};
