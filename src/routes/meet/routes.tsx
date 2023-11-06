import React from "react";
import { RouteObject } from "react-router-dom";
import routePaths from "./../../constants/routes";
import Meet from "pages/meet";

export const meetRoutes: RouteObject[] = [
	{
		path: routePaths.MEET.__PATH,
		element: <Meet />,
	},
];
