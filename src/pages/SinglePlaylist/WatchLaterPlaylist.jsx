import { AsideNav } from "../../components/AsideNav/AsideNav";
import { PlaylistVideo } from "./components/PlaylistVideo";
import { useUserData } from "../../context/UserDataContext";
export const WatchLaterPlaylist = () => {
	const { userData } = useUserData();

	return (
		<div className="main-container">
			<AsideNav />

			<div className="padding-l">
				<h2>Saved Videos</h2>
				<div>
					{userData.watchLaterPlaylist.map((video) => (
						<PlaylistVideo video={video} />
					))}
				</div>
			</div>
		</div>
	);
};
