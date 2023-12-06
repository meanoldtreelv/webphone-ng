import { RouteObject } from "react-router-dom";
import routePaths from "./../../constants/routes";
import Dashboard from "pages/Dashboard";
import ProtectedRoutes from "utils/ProtectedRoutes";
import ComponentErrorBoundary from "wrappers/ComponentErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";

export const dashboardRoutes: RouteObject[] = [
	{
		path: routePaths.DASHBOARD.__PATH,
		element: (
			<ProtectedRoutes>
				<Dashboard />
			</ProtectedRoutes>
		),
	},
];
