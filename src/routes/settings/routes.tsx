import { RouteObject } from "react-router-dom";
import routePaths from "./../../constants/routes";
import Settings from "./../../pages/Settings";
import ProtectedRoutes from "utils/ProtectedRoutes";

export const settingsRoutes: RouteObject[] = [
	{
		path: routePaths.SETTINGS.__PATH,
		element: (
			<ProtectedRoutes>
				<Settings />
			</ProtectedRoutes>
		),
	},
];
