import { RouteObject } from "react-router-dom";
import routePaths from "./../../constants/routes";
import Login from "pages/Login";

export const authRoutes: RouteObject[] = [
	{
		path: routePaths.AUTH.__PATH,
		children: [
			{
				path: routePaths.AUTH.LOGIN.__PATH,
				element: <Login />,
			},
		],
	},
];
