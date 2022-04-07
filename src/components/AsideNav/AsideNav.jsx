import "./AsideNav.css";
import { NavLink } from "react-router-dom";
export const AsideNav = () => {
	const getActiveStyle = ({ isActive }) => ({
		color: isActive ? "#01d2ed" : "",
	});
	return (
		<aside class="aside-nav">
			<ul className="text-center aside-items">
				<NavLink style={getActiveStyle} to="/">
					<li className="flex-column   ">
						<i class="fas fa-compass"></i> Explore
					</li>
				</NavLink>

				<NavLink style={getActiveStyle} to="/playlists">
					<li className="flex-column   ">
						<i class="fas fa-folder-plus"></i>Playlists
					</li>
				</NavLink>
				<NavLink style={getActiveStyle} to="/likes">
					<li className="flex-column   ">
						<i class="fas fa-thumbs-up"></i>Liked
					</li>
				</NavLink>
				<NavLink style={getActiveStyle} to="/watchLater">
					<li className="flex-column   ">
						<i class="fas fa-bookmark"></i>Watch Later
					</li>
				</NavLink>
				<NavLink style={getActiveStyle} to="/history">
					<li className="flex-column   ">
						<i class="fas fa-history"></i>History
					</li>
				</NavLink>
			</ul>
		</aside>
	);
};
