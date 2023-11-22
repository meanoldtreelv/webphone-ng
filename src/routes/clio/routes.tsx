import React from "react";
import { RouteObject } from "react-router-dom";
import routePaths from "./../../constants/routes";
import Clio from "pages/Clio";

export const clioRoutes: RouteObject[] = [
	{
		path: routePaths.CLIO.__PATH,
		element: <Clio />,
	},
];
