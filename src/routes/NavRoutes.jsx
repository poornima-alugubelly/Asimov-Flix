import { Route, Routes } from "react-router-dom";
import { Playlists } from "../pages/Playlists/Playlists";
import { Explore } from "../pages/Explore/Explore";
import { SinglePlaylist } from "../pages/SinglePlaylist/SinglePlaylist";
import { SingleVideo } from "../pages/SingleVideo/SingleVideo";
import { Login } from "../pages/Auth/Login/Login";
import { Signup } from "../pages/Auth/Signup/Signup";
import { LikesPlaylist } from "../pages/SinglePlaylist/LikesPlaylist";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { WatchLaterPlaylist } from "../pages/SinglePlaylist/WatchLaterPlaylist";
export const NavRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Explore />} />
			<Route path="/explore" element={<Explore />} />
			<Route path="/playlists" element={<Playlists />} />
			<Route path="/singlePlaylist" element={<SinglePlaylist />} />

			<Route path="explore/:videoId" element={<SingleVideo />} />
			<Route path="/" element={<ProtectedRoutes />}>
				<Route path="/likes" element={<LikesPlaylist />} />
				<Route path="/watchLater" element={<WatchLaterPlaylist />} />
			</Route>

			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
		</Routes>
	);
};
