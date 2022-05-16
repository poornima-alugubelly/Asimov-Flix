import "./NavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
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

	const getActiveStyle = ({ isActive }) => ({
		color: isActive ? "#01d2ed" : "",
	});

	const logoutHandler = () => {
		localStorage.removeItem("tokenVL");
		localStorage.removeItem("isAuthVL");
		setAuth({ tokenVL: "", isAuthVL: false });
		navigate("/");
	};

	return (
		<nav className="nav-bar">
			<div className="nav-bar-primary">
				<NavLink to="/" style={getActiveStyle} className="nav-bar-logo">
					AX
				</NavLink>

				<ul className="nav-bar-links">
					<li>
						<NavLink to="/" style={getActiveStyle}>
							Explore
						</NavLink>
					</li>
					<li>
						<NavLink to="/playlists" style={getActiveStyle}>
							Playlists
						</NavLink>
					</li>
				</ul>
			</div>

			<div className="search-bar input">
				<input
					type="text"
					placeholder="Enter category or product name..."
					value={searchText}
					onChange={(e) => {
						navigate("/");
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
						<NavLink
							to="/login"
							style={getActiveStyle}
							className="flex-column "
						>
							<i class="fas fa-user btn-icon"></i>

							<span className="text-xxs pointer">Logout </span>
						</NavLink>
					</div>
				) : (
					<div className="flex-column">
						<NavLink
							to="/login"
							style={getActiveStyle}
							className="flex-column "
						>
							<i class="fas fa-user btn-icon"></i>
							<span className="text-xxs pointer">Login</span>
						</NavLink>
					</div>
				)}
			</ul>
		</nav>
	);
};
