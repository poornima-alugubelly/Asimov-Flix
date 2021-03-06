import { AsideNav } from "../../components/AsideNav/AsideNav";
import { PlaylistVideo } from "./components/PlaylistVideo";
import { useUserData } from "../../context/UserDataContext";
import { Loader } from "../../components/Loader/Loader";
export const WatchLaterPlaylist = () => {
	const {
		userData: { watchLaterPlaylist },
		watchLaterLoading,
	} = useUserData();

	return !watchLaterLoading ? (
		<div className="main-container">
			<AsideNav />

			<div className="padding-l">
				<h2>Saved Videos</h2>
				<div className="padding-tp-btm-s">
					{watchLaterPlaylist.length === 0 ? (
						<h3>No videos saved...</h3>
					) : (
						watchLaterPlaylist.map((video) => (
							<PlaylistVideo video={video} playlistTitle="Watch Later" />
						))
					)}
				</div>
			</div>
		</div>
	) : (
		<Loader />
	);
};
