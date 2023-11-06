import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getCookie } from "utils";

const useAuth = () => {
	const navigate = useNavigate();

	const isAuthenticated = () => {
		const accessToken = getCookie("access_token");
		return !!accessToken;
	};

	const redirectToLoginPage = () => {
		navigate("/auth/login");
	};

	useEffect(() => {
		if (!isAuthenticated()) {
			redirectToLoginPage();
		}
	}, []);

	return { isAuthenticated, redirectToLoginPage };
};

export default useAuth;
