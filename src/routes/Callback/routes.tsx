import { RouteObject } from "react-router-dom";
import routePaths from './../../constants/routes';
import Callback from 'pages/Callback';

export const callbackRoutes: RouteObject[] = [
    {
        path: routePaths.CALLBACK.__PATH,
        element: <Callback />,
    },
];
