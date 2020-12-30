import React from 'react';
import { useRoutes } from 'hookrouter';
// import CONFIG from '../../config';

import {HTML404} from '../ErrorPage/Error'
import TokenExpired from './expired';
import TokenInvalid from './invalid';
import TokenVerified from './verified';


const routes = {
    'verified': () => <TokenVerified />,
    'invalid-token': () => <TokenInvalid />,
    'token-expired': () => <TokenExpired />,
};


export default function Verify(props) {
    const page = useRoutes(routes);
    return (page);
}