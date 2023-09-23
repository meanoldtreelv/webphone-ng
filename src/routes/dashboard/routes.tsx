import { RouteObject } from "react-router-dom";
import routePaths from './../../constants/routes';
import Dashboard from 'pages/Dashboard';

export const dashboardRoutes: RouteObject[] = [
    {
        path: routePaths.DASHBOARD.__PATH,
        element: <Dashboard />,
    },
];
