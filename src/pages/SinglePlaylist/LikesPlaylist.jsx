import { AsideNav } from "../../components/AsideNav/AsideNav";
import { videos } from "../../backend/db/videos";
import { PlaylistVideo } from "./components/PlaylistVideo";
import { useUserData } from "../../context/UserDataContext";
export const LikesPlaylist = () => {
	const { userData } = useUserData();

	return (
		<div className="main-container">
			<AsideNav />

			<div className="padding-l">
				<h2>Likes Videos</h2>
				<div>
					{userData.likesPlaylist.map((video) => (
						<PlaylistVideo video={video} />
					))}
				</div>
			</div>
		</div>
	);
};
