import React from "react";
import { RouteObject } from "react-router-dom";
import routePaths from "./../../constants/routes";
import Settings from "./../../pages/Settings";

export const settingsRoutes: RouteObject[] = [
	{
		path: routePaths.SETTINGS.__PATH,
		element: <Settings />,
	},
];
