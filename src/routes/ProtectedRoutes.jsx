import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoutes = () => {
	const { auth } = useAuth();
	const location = useLocation();
	return auth.isAuthVL ? (
		<Outlet />
	) : (
		<Navigate to="login" state={{ from: location }} replace />
	);
};
