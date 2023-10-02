import { createBrowserRouter, RouteObject } from "react-router-dom";
import { contactRoutes } from "./contacts/routes";
import { voicemailRoutes } from "./voicemail/routes";
import { authRoutes } from "./auth/routes";
import { conferenceRoutes } from "./conference/routes";
import { callHistoryRoutes } from "./callHistory/routes";
import Home from "./../pages/Home";
import { dashboardRoutes } from "./dashboard/routes";
import ErrorBoundaryLayout from "./../layouts/ErrorBoundaryLayout";
import { settingsRoutes } from "./settings/routes";
import { sidecarRoutes } from "./sidecar/routes";
import { getCookie } from "utils";
import sip from "lib/sip";
import { store } from "redux/store";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Home />,
	},
];
const extAuth = getCookie("extAuth")
const ext_user_id = getCookie("ext_user_id")
const ext_password = getCookie("ext_password")
extAuth && ext_user_id && ext_password && store.dispatch({type:"sip/extAuth", payload:extAuth}) && sip.CreateUserAgent(extAuth, ext_user_id);
export default createBrowserRouter([
	{
		errorElement: <ErrorBoundaryLayout />,
		children: [
			...routes,
			...contactRoutes,
			...voicemailRoutes,
			...authRoutes,
			...conferenceRoutes,
			...callHistoryRoutes,
			...dashboardRoutes,
			...settingsRoutes,
			...sidecarRoutes,
		],
	},
]);
