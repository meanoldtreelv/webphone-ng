import React from "react";
import { RouteObject } from "react-router-dom";
import routePaths from "./../../constants/routes";
import Sidecar from "./../../pages/Sidecar";

export const sidecarRoutes: RouteObject[] = [
	{
		path: routePaths.SIDECAR.__PATH,
		element: <Sidecar />,
	},
];
