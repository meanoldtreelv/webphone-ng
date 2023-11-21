import { RouteObject } from "react-router-dom";
import routePaths from "./../../constants/routes";
import Contact from "./../../pages/Contact";
import ProtectedRoutes from "utils/ProtectedRoutes";

export const contactRoutes: RouteObject[] = [
	{
		path: routePaths.CONTACT.__PATH,
		element: (
			<ProtectedRoutes>
				<Contact />
			</ProtectedRoutes>
		),
	},
];
