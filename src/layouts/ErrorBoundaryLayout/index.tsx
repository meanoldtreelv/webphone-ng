import { Outlet, useNavigate, useRouteError } from "react-router";
import ErrorBoundary from "./../../wrappers/ErrorBoundary";
import { useEffect } from "react";

const ErrorBoundaryLayout = () => {
	const error = useRouteError();
	const navigate = useNavigate();

	useEffect(() => {
		if (error?.status === 404) {
			navigate("/dashboard");
		}
	}, []);

	return (
		<ErrorBoundary>
			<Outlet />
		</ErrorBoundary>
	);
};

export default ErrorBoundaryLayout;
