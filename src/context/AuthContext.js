import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(() => {
		const tokenVL = localStorage.getItem("tokenVL");

		if (tokenVL) return { tokenVL, isAuthVL: true };

		return { tokenVL: "", isAuthVL: false };
	});
	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export { useAuth, AuthProvider };
