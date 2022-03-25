import { AsideNav } from "../../components/AsideNav/AsideNav";
import "./SingleVideo.css";
import { PlaylistModal } from "../../components/PlaylistModal/PlaylistModal";
import { useState } from "react";
export const SingleVideo = () => {
	const [opened, setOpened] = useState(false);

	return (
		<div className="main-container">
			<AsideNav />
			<PlaylistModal val={opened} setOpened={setOpened} />
			<div className="grid-70-30">
				<div>
					<iframe
						width="100%"
						src="https://www.youtube.com/embed/niyCe6ajm48?list=RDniyCe6ajm48"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						loading="lazy"
						className="video-player"
					></iframe>
					<div className="video-description">
						<h2>High Hopes - AMV [Oni-Con XV 2018 Anime Action Finalist]</h2>
						<span>1232354 • views</span>
						<div className="flex-row gap-l padding-tp-btm-s">
							<i class="far fa-thumbs-up btn-icon"></i>
							<i class="far fa-thumbs-down btn-icon"></i>
							<i
								class="fas fa-folder-plus btn-icon"
								onClick={() => setOpened(true)}
							></i>
							<i class="far fa-bookmark btn-icon"></i>
						</div>
						<div className="creator padding-xs text-s">Creator</div>
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
