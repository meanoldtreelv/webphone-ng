import { createBrowserRouter, RouteObject } from "react-router-dom";
import { contactRoutes } from "./contacts/routes";
import { voicemailRoutes } from "./voicemail/routes";
import { authRoutes } from "./auth/routes";
import { conferenceRoutes } from "./conference/routes";
import { callHistoryRoutes } from "./callHistory/routes";
import { dashboardRoutes } from "./dashboard/routes";
import { settingsRoutes } from "./settings/routes";
import { sidecarRoutes } from "./sidecar/routes";
import { callbackRoutes } from "./Callback/routes";
import { chatRoutes } from "./chat/routes";
import { meetRoutes } from "./meet/routes";
import { getCookie } from "utils";
import ErrorBoundaryLayout from "./../layouts/ErrorBoundaryLayout";
import Home from "./../pages/Home";
import sip from "lib/sip";
import { store } from "redux/store";
import { ErrorBoundary } from "react-error-boundary";
import RedirectMsg from "components/shared/RedirectMsg";
import GlobalErrorBoundary from "components/shared/ErrorBoundary";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Home />,
	},
	// {
	// 	path: "/redirect",
	// 	element: (
	// 		<GlobalErrorBoundary>
	// 			<RedirectMsg />
	// 		</GlobalErrorBoundary>
	// 	),
	// },
];

const extAuth = localStorage.getItem("extAuth");
const apiAuth = localStorage.getItem("apiAuth");
const status = localStorage.getItem("status");
const ext_user_id = localStorage.getItem("ext_user_id");
const ext_password = localStorage.getItem("ext_password");
const ext_domain = localStorage.getItem("ext_domain");
const ext_connected = localStorage.getItem("ext_connected");
const instancesVal = localStorage.getItem("instancesVal");
const instance_id = localStorage.getItem("instance_id");

instance_id && store.dispatch({ type: "sip/instance_id", payload: instance_id });
instancesVal && store.dispatch({ type: "sip/extAuthList", payload: JSON.parse(instancesVal) });
status && store.dispatch({ type: "sip/status", payload: status });
apiAuth && store.dispatch({ type: "sip/apiAuth", payload: JSON.parse(apiAuth) });
ext_connected === "true" &&
	ext_user_id &&
	ext_password &&
	ext_domain &&
	store.dispatch({ type: "sip/extAuth", payload: extAuth === "true" }) &&
	sip.CreateUserAgent(ext_user_id, ext_password, ext_domain);
// console.log("this is the output: ", window?.navigator?.userAgentData?.mobile);
const isMobile = () =>
	window?.navigator?.userAgentData?.mobile ||
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile()) {
	var suggestPortraitOnMobileModalFirstTime = true;
	const suggestPortraitOnMobileModal = () => {
		if (suggestPortraitOnMobileModalFirstTime) {
			store.dispatch({ type: "sip/suggestPortraitOnMobileModalShow", payload: true });
			// suggestPortraitOnMobileModalFirstTime = false; // To show the message once uncomment this
		}
	};
	if (window.matchMedia("(orientation: Landscape)").matches) {
		suggestPortraitOnMobileModal();
	}
	let portrait = window.matchMedia("(orientation: portrait)");
	portrait.addEventListener("change", function (e) {
		if (e.matches) {
			// Portrait mode"
			store.dispatch({ type: "sip/suggestPortraitOnMobileModalShow", payload: false });
		} else {
			// Landscape
			suggestPortraitOnMobileModal();
		}
	});
}

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
			...chatRoutes,
		],
	},
]);
