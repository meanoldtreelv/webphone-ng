import { createBrowserRouter, RouteObject } from "react-router-dom";
import { contactRoutes } from "./contacts/routes";
import { voicemailRoutes } from "./voicemail/routes";
import { authRoutes } from "./auth/routes";
import { conferenceRoutes } from "./conference/routes";
import { callHistoryRoutes } from "./callHistory/routes";
import { meetRoutes } from "./meet/routes";
import Home from "./../pages/Home";
import { dashboardRoutes } from "./dashboard/routes";
import ErrorBoundaryLayout from "./../layouts/ErrorBoundaryLayout";
import { settingsRoutes } from "./settings/routes";
import { sidecarRoutes } from "./sidecar/routes";
import { getCookie } from "utils";
import sip from "lib/sip";
import { store } from "redux/store";
import { callbackRoutes } from "./Callback/routes";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Home />,
	},
];
const extAuth = getCookie("extAuth");
const apiAuth = getCookie("apiAuth");
const ext_user_id = getCookie("ext_user_id");
const ext_password = getCookie("ext_password");
const ext_domain = getCookie("ext_domain");
const ext_connected = getCookie("ext_connected");
const instancesVal = getCookie("instancesVal");

instancesVal && store.dispatch({ type: "sip/extAuthList", payload: JSON.parse(instancesVal) });

apiAuth && store.dispatch({ type: "sip/apiAuth", payload: JSON.parse(apiAuth) });
ext_connected === "true" &&
	ext_user_id &&
	ext_password &&
	ext_domain &&
	store.dispatch({ type: "sip/extAuth", payload: extAuth === "true" }) &&
	sip.CreateUserAgent(ext_user_id, ext_password, ext_domain);
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
			...callbackRoutes,
			...meetRoutes,
		],
	},
]);
