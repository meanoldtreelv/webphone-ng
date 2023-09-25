import { createBrowserRouter, RouteObject } from "react-router-dom";
import { contactRoutes } from "./contacts/routes";
import { voicemailRoutes } from "./voicemail/routes";
import { authRoutes } from "./auth/routes";
import { conferenceRoutes } from "./conference/routes";
import { callHistoryRoutes } from "./callHistory/routes";

import Home from "pages/Home";
import { dashboardRoutes } from "./dashboard/routes";
import { settingsRoutes } from "./settings/routes";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Home />,
	},
];

export default createBrowserRouter([
	...routes,
	...contactRoutes,
	...voicemailRoutes,
	...authRoutes,
	...conferenceRoutes,
	...callHistoryRoutes,
	...dashboardRoutes,
	...settingsRoutes,
]);
