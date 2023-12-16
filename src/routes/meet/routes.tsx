import { RouteObject } from "react-router-dom";
import routePaths from "./../../constants/routes";
import Meet from "pages/meet";
import ProtectedRoutes from "utils/ProtectedRoutes";

export const meetRoutes: RouteObject[] = [
	{
		path: routePaths.MEET.__PATH,
		element: (
			<ProtectedRoutes>
				<Meet />
			</ProtectedRoutes>
		),
	},
];
