import React from "react";
// import useAuth
import { IAuthWrapper } from "constants/interfaces";
import { useNavigate } from "react-router";

const AuthWrapper: React.FC<IAuthWrapper> = ({ children }) => {
	//  const { isAuthenticated } = useAuth();

	const { isAuthenticated } = { isAuthenticated: true };

	if (!isAuthenticated) {
		// redirect to login page
	}

	return <>{children}</>;
};

export default AuthWrapper;
