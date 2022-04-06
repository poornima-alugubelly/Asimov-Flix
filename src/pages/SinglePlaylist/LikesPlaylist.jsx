import { AsideNav } from "../../components/AsideNav/AsideNav";
import { PlaylistVideo } from "./components/PlaylistVideo";
import { useUserData } from "../../context/UserDataContext";
import { Loader } from "../../components/Loader/Loader";
export const LikesPlaylist = () => {
	const {
		userData: { likesPlaylist },
		likesLoading,
	} = useUserData();

	return !likesLoading ? (
		<div className="main-container">
			<AsideNav />

			<div className="padding-l">
				<h2>Liked Videos</h2>
				<div className="padding-tp-btm-s">
					{likesPlaylist.length === 0 ? (
						<h3>No Videos liked...</h3>
					) : (
						likesPlaylist.map((video) => (
							<PlaylistVideo video={video} playlistTitle="Likes" />
						))
					)}
				</div>
			</div>
		</div>
	) : (
		<Loader />
	);
};
