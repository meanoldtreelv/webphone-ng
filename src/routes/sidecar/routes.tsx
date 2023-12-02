import React from "react";
import { RouteObject } from "react-router-dom";
import routePaths from "./../../constants/routes";
import Sidecar from "./../../pages/Sidecar";
import ProtectedRoutes from "utils/ProtectedRoutes";

export const sidecarRoutes: RouteObject[] = [
	{
		path: routePaths.SIDECAR.__PATH,
		element: (
			<ProtectedRoutes>
				<Sidecar />
			</ProtectedRoutes>
		),
	},
];
