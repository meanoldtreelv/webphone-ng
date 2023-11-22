import React from "react";
import { useNavigate } from "react-router";
import { getCookie } from "utils";

interface IProtectedRoutes {
	children: React.ReactNode;
}

const ProtectedRoutes: React.FC<IProtectedRoutes> = ({ children }) => {
	const navigate = useNavigate();

	const access_token = getCookie("id_token");
	const refresh_token = getCookie("refresh_token");
	const extAuth = getCookie("extAuth");

	// if (!(access_token && refresh_token) || access_token === "undefined") {
	// 	if (!extAuth) {
	// 		navigate("/auth/login");
	// 	}
	// }

	return children;
};

export default ProtectedRoutes;
