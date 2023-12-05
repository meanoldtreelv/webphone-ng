import { useRouteError } from "react-router";

const ErrorBoundary = ({ children }: any) => {
	const error: any = useRouteError();

	if (error) {
		return <div>Sorry, Something went wrong!</div>;
	}

	return children;
};

export default ErrorBoundary;
