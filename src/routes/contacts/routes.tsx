import { RouteObject } from "react-router-dom";
import routePaths from './../../constants/routes';
import Contact from './../../pages/Contact';

export const contactRoutes: RouteObject[] = [
    {
        path: routePaths.CONTACT.__PATH,
        element: <Contact />,
    },
];
