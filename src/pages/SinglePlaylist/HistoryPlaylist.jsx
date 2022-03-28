import { AsideNav } from "../../components/AsideNav/AsideNav";
import { PlaylistVideo } from "./components/PlaylistVideo";
import { useUserData } from "../../context/UserDataContext";
export const HistoryPlaylist = () => {
	const {
		userData: { history },
	} = useUserData();

	return (
		<div className="main-container">
			<AsideNav />

			<div className="padding-l">
				<h2>History</h2>
				<div className="padding-tp-btm-s">
					{history.length === 0 ? (
						<h3>No Videos watched...</h3>
					) : (
						history.map((video) => (
							<PlaylistVideo video={video} playlistTitle="History" />
						))
					)}
				</div>
			</div>
		</div>
	);
};
