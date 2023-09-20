import React from 'react';
import { RouteObject } from "react-router-dom";
import routePaths from './../../constants/routes';
import Conference from './../../pages/Conference';

export const conferenceRoutes: RouteObject[] = [
    {
        path: routePaths.CONFERENCE.__PATH,
        element: <Conference />,
        
    },
];