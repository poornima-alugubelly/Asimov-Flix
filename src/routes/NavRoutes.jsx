import { Route, Routes } from "react-router-dom";
import { Playlists } from "../Pages/Playlists/Playlists";
import { Explore } from "../Pages/Explore/Explore";
import { SinglePlaylist } from "../Pages/SinglePlaylist/SinglePlaylist";
import { SingleVideo } from "../Pages/SingleVideo/SingleVideo";
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
