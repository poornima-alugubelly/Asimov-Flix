import "./Playlist.css";
import { AsideNav } from "../../components/AsideNav/AsideNav";
import { useNavigate } from "react-router-dom";
export const Playlists = () => {
	const lists = ["watchlater", "abc", "xyz", "123", "ok"];
	const navigate = useNavigate();
	return (
		<div className="main-container">
			<AsideNav />
			<div className="grid-autofill-layout">
				<div
					className="container card card-vertical"
					onClick={() => navigate("/likes")}
				>
					<div className="text-overlay">liked</div>
				</div>
				{lists.map((item) => (
					<div
						className="container card card-vertical"
						onClick={() => navigate("/singlePlaylist")}
					>
						<div className="text-overlay">{item}</div>
					</div>
				))}
			</div>
		</div>
	);
};
