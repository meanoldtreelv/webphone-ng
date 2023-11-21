import { RouteObject } from "react-router-dom";
import routePaths from "./../../constants/routes";
import Conference from "./../../pages/Conference";
import ProtectedRoutes from "utils/ProtectedRoutes";

export const conferenceRoutes: RouteObject[] = [
	routePaths.CONFERENCE.__PATH,
	routePaths.CONFERENCE.GROUPS.ROUTE,
	routePaths.CONFERENCE.CALL_HISTORY.ROUTE,
].map((route) => ({
	path: route,
	element: (
		<ProtectedRoutes>
			<Conference />
		</ProtectedRoutes>
	),
}));
