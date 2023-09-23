import { RouteObject } from "react-router-dom";
import routePaths from './../../constants/routes';
import CallHistory from 'pages/CallHistory';

export const callHistoryRoutes: RouteObject[] = [
    {
        path: routePaths.CALL_HISTORY.__PATH,
        element: <CallHistory />,
    },
];
