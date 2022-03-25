import axios from "axios";
export const loginService = async (email, password) => {
	console.log("email", email, "password", password);

	return await axios.post("/api/auth/login", {
		email,
		password,
	});
};
