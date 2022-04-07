import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { actionTypes } from "../../constants/actionTypes";
import { useVideoListing } from "../../context/VideosListingContext";
export const NavBar = () => {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();
	const {
		videoListingState: { searchText },
		videoListingDispatch,
	} = useVideoListing();
	const { SEARCH } = actionTypes;
	const [typing, setTyping] = useState(false);

	const logoutHandler = () => {
		localStorage.removeItem("tokenVL");
		localStorage.removeItem("isAuthVL");
		setAuth({ tokenVL: "", isAuthVL: false });
		navigate("/explore");
	};

	return (
		<nav className="nav-bar">
			<div className="nav-bar-primary">
				<Link to="/explore" className="nav-bar-logo">
					AX
				</Link>

				<ul className="nav-bar-links">
					<li>
						<Link to="/explore">Explore</Link>
					</li>
					<li>
						<Link to="/playlists">Playlists</Link>
					</li>
				</ul>
			</div>

			<div className="search-bar input">
				<input
					type="text"
					placeholder="Enter category or product name..."
					value={searchText}
					onChange={(e) => {
						navigate("/explore");
						setTyping(true);
						videoListingDispatch({
							type: SEARCH,
							payload: { searchInput: e.target.value },
						});
					}}
				/>
				<button>
					<img
						className="icon-search"
						src={
							typing && searchText
								? "/assets/dismiss-blue.svg"
								: "/assets/Search.svg"
						}
						alt="search"
						onClick={() => {
							setTyping(false);
							videoListingDispatch({
								type: SEARCH,
								payload: { searchInput: "" },
							});
						}}
					/>
				</button>
			</div>

			<ul className="nav-bar-secondary">
				{auth.isAuthVL ? (
					<div onClick={logoutHandler}>
						<Link to="/login" className="flex-column ">
							<i class="fas fa-user btn-icon"></i>

							<span className="text-xxs pointer">Logout </span>
						</Link>
					</div>
				) : (
					<div className="flex-column">
						<Link to="/login" className="flex-column ">
							<i class="fas fa-user btn-icon"></i>
							<span className="text-xxs pointer">Login</span>
						</Link>
					</div>
				)}
			</ul>
		</nav>
	);
};
