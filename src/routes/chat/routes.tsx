import React from "react";
import { RouteObject } from "react-router-dom";
import routePaths from "./../../constants/routes";
import Chat from "pages/Chat";
import ProtectedRoutes from "utils/ProtectedRoutes";

export const chatRoutes: RouteObject[] = [
	{
		path: routePaths.CHAT.__PATH,
		element: (
			<ProtectedRoutes>
				<Chat />
			</ProtectedRoutes>
		),
	},
];
