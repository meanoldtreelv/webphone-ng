import React from 'react';
import { RouteObject } from "react-router-dom";
import routePaths from './../../constants/routes';
import Voicemail from '../../pages/Voicemail';

export const voicemailRoutes: RouteObject[] = [
    {
        path: routePaths.VOICEMAIL.__PATH,
        element: <Voicemail />,
    },
];