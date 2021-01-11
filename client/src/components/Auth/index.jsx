import React from "react"
import { useRoutes, navigate } from 'hookrouter';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import Register from './Local/register';
import Login from './Local/login';
import Verification from './Local/verification';
import ResetPassword from './Local/resetPassword';
import ForgotPassword from './Local/forgotPassword';
import Navbar from '../Navigation/navbar/navbar';

import GoogleAuth from './google';
import FacebookAuth from './facebook';

import './style.css'
import { HTML404 } from '../ErrorPage/Error';


// Styled Components =====================================================

let AuthPage = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    min-height: 100vh;
    margin-top: 50px;
    .auth-container{
        width: 500px;
        place-self: center;
        border: 2px solid #aaaaaa;
        border-radius: 10px;
        padding: 10px;
        .heading{
            display: flex;
            justify-content: space-evenly;
            margin-top: 10px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #7e7e7e;
            cursor: pointer;
            .chng-btn{
                width: 40%;
                height: 3em;
                text-align: center;
                border-radius: 5px;
                border-style: none;
                color: #050831;
                background-color: #eeeeee;
            }
            .active{
                    background-color: #43b9dd;
                }
        }
    }
`;

let OrBlock = styled.div`
    width: 100%;
    display: grid;
    margin-top: 20px;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    grid-column-gap: 30px;
    span{
        align-self: center;
        font-size: 2em;
    }
    div{
        border: 2px solid black;
        height: 0px;
    }
`;

let OtherAuthMethods = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
// ========================================================================



const routes = {
    '/': () => ({ obj: <Login />, str: 'login' }),
    '/login': () => ({ obj: <Login />, str: 'login' }),
    '/register': () => ({ obj: <Register />, str: 'register' }),
    '/send-verification': () => ({ obj: <Verification />, str: 'verification' }),
    '/forgot-password': () => ({obj: <ForgotPassword />, str: 'forgot-password'}),
    '/reset-password': () => ({obj: <ResetPassword />, str: 'reset-password'})
}

function Auth() {
    let page = useRoutes(routes);

    return (
        (page && 
            <AuthPage>
            <div className="auth-container">
                <div className="heading">
                    <Button active={page.str === 'register'} className="chng-btn" onClick={()=>navigate('/auth/register')}>Register</Button>
                    <Button active={page.str === 'login'} className="chng-btn" onClick={()=>navigate('/auth/login')}>Login</Button>
                </div>
                { page.obj }
                <OrBlock>
                    <div></div>
                    <span>Or</span>
                    <div></div>
                </OrBlock>

                <OtherAuthMethods>
                    <GoogleAuth />
                    <FacebookAuth />
                </OtherAuthMethods>
          </div>
            </AuthPage>) || <HTML404 />
  );
}
export default Auth;