import { useRouteError } from "react-router";

const ErrorBoundary = ({ children }: any) => {
	const error: any = useRouteError();

	// error.status

	if (error) {
		// please use appropriate UI for displaying errors
		return <div>Sorry, Something went wrong!</div>;
	}

	return children;
};

export default ErrorBoundary;
