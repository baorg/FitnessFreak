import React from "react"
import { useRoutes } from 'hookrouter';

import { Register, Login } from './Local';
import GoogleAuth from "./google";
import FacebookAuth from "./facebook";
import Logout from './logout';

import './style.css'
import { HTML404 } from '../ErrorPage/Error';

function getRoutes(user) {
    return {
        '/': () => <Main/>,
        // '/login': () => <Login/>,
        '/register':()=><Register />,
        '/logout': ()=><Logout/>,
    }
}

function Main(props) {
    return (
        <div className="container">
            <Register />
            <div className="split"><span>Or</span></div>
            <div className="div-login">
                <Login />
                <GoogleAuth />
                <FacebookAuth />
            </div>
        </div>);
}


function Auth(props) {
    const page = useRoutes(getRoutes());
  return (
    page || <HTML404 />
  );
}
export default Auth;