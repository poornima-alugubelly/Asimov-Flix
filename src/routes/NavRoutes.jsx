import { Route, Routes } from "react-router-dom";
import { Playlists } from "../pages/Playlists/Playlists";
import { Explore } from "../pages/Explore/Explore";
import { SinglePlaylist } from "../pages/SinglePlaylist/SinglePlaylist";
import { SingleVideo } from "../pages/SingleVideo/SingleVideo";
export const NavRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Explore />} />
			<Route path="/explore" element={<Explore />} />
			<Route path="/playlists" element={<Playlists />} />
			<Route path="/singlePlaylist" element={<SinglePlaylist />} />
			<Route path="/singleVideo" element={<SingleVideo />} />
		</Routes>
	);
};
