import { RouteObject } from "react-router-dom";
import routePaths from "./../../constants/routes";
import Voicemail from "../../pages/Voicemail";
import ProtectedRoutes from "utils/ProtectedRoutes";

export const voicemailRoutes: RouteObject[] = [
	{
		path: routePaths.VOICEMAIL.__PATH,
		element: (
			<ProtectedRoutes>
				<Voicemail />
			</ProtectedRoutes>
		),
	},
];
