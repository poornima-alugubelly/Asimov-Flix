import "./AsideNav.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const AsideNav = () => {
	const navigate = useNavigate();
	return (
		<aside class="aside-nav">
			<ul className="text-center aside-items">
				<Link to="/explore">
					<li className="flex-column   ">
						<i class="fas fa-compass"></i> Explore
					</li>
				</Link>

				<Link to="/playlists">
					<li className="flex-column   ">
						<i class="fas fa-folder-plus"></i>Playlists
					</li>
				</Link>
				<Link to="/likes">
					<li className="flex-column   ">
						<i class="fas fa-thumbs-up"></i>Liked
					</li>
				</Link>
				<Link to="/watchLater">
					<li className="flex-column   ">
						<i class="fas fa-bookmark"></i>Watch Later
					</li>
				</Link>
				<Link to="/history">
					<li className="flex-column   ">
						<i class="fas fa-history"></i>History
					</li>
				</Link>
			</ul>
		</aside>
	);
};
