import "./NavBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
// import { useUserData } from "../../context/UserDataContext";
export const NavBar = () => {
	const { auth, setAuth } = useAuth();

	const logoutHandler = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("isAuth");
		setAuth({ token: "", isAuth: false });
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
						<Link to="/ProductListing">Playlists</Link>
					</li>
				</ul>
			</div>

			<div className="search-bar input">
				<input type="text" placeholder="type to search..." />
				<button>
					<img className="icon-search" src="assets/Search.svg" alt="search" />
				</button>
			</div>

			<ul className="nav-bar-secondary">
				{auth.isAuth ? (
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
