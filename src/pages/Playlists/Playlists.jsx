import "./Playlist.css";
import { AsideNav } from "../../components/AsideNav/AsideNav";
import { useUserData } from "../../context/UserDataContext";
import { PlaylistCard } from "./components/PlaylistCard";

export const Playlists = () => {
	const {
		userData: { playlists },
	} = useUserData();

	return (
		<div className="main-container">
			<AsideNav />
			<div className="grid-autofill-layout">
				{playlists.length === 0 ? (
					<h3>No playlists created...</h3>
				) : (
					playlists.map((playlist) =>
						playlist.length === 0 ? (
							<h3>No videos created...</h3>
						) : (
							<PlaylistCard playlist={playlist} />
						)
					)
				)}
			</div>
		</div>
	);
};
