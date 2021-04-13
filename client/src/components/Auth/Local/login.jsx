import React, { useState } from "react"
import { navigate, A } from 'hookrouter';
import styled from 'styled-components';


import {
    LinearProgress, Button,
    Grid
} from '@material-ui/core';
import {
    Alert
} from '@material-ui/lab';


import ajaxRequest from '../../../ajaxRequest'
import CONFIG from '../../../config';
import { Name, Password } from './utils';


// Styled Components ======================================================

let LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    
    .form-heading{
        font-weight: 600;
        font-size: 27px;
        line-height: 32px;
        color: #424259;
        margin-bottom: 10px;
    }

    .form-subheading{
        font-size: 20px;
        line-height: 24px;
        color: rgba(66, 66, 89, 0.9);
    }


    .action-div{
        width: 100%;
        box-sizing: border-box;
        padding: 1em 0 1em 0;
    }
    .err-msg{
        background-color: #e09393;
        height: 2em;
        border-radius: 10px;
        text-align: center;
        align-content: center;
        text-justify: center;
    }

    .bottom{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
        
        .register{
            .text{
                font-size: 20px;
                line-height: 24px;
                color: rgba(66, 66, 89, 0.9);
            }
            .link{
                font-weight: 500;
                font-size: 23px;
                line-height: 27px;
                color: #065BFB;
            }
        }
        .forgot-password{
            font-size: 20px;
            line-height: 24px;
            color: rgba(66, 66, 89, 0.9);
        }
    
    }

`;

let StyledButton = styled(Button)`
    justify-self: center;
    width: 100%;
    align-self: center;
    background: #065BFB !important;
    height: 60px;
    border-radius: 9px;
`;
// =========================================================================


export default function Login(props) {
    const [userName, setUserName] = useState({value:'', error: null});
    const [password, setPassword] = useState({value:'', error: null});
    const [msg, setMsg] = useState('');
    const [sending, setSending] = useState(false);

    return (
        <LoginForm method="post" onSubmit={handleSubmit} className="form-container" >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className="form-heading">Welcome back!</div>
                    <div className="form-subheading">Please Login to your account</div>
                </Grid>
                <Grid item xs={12}>
                    {sending ? <LinearProgress />
                        : msg && <Alert severity="error">{msg}</Alert>}
                </Grid>
                {/* <div className="action-div"></div> */}
                <Grid item xs={12}>
                    <Name
                        id="username-login"
                        input={{ name: "username", label: "Username", max_length: "20", placeholder: 'Username' }}
                        name={userName}
                        setName={setUserName} />
                </Grid>
                <Grid item xs={12}>
                    <Password 
                        id="password-login"
                        input={{label:"Password", placeholder: "enter password", name:'password'}}
                        password={password}
                        setPassword={setPassword}/>
                </Grid>
                <Grid item xs={12}>
                    <StyledButton
                        type="submit"
                        id="login-btn"
                        variant="contained"
                        color="primary"
                        disabled={sending}
                    >Login</StyledButton>
                </Grid>
                <Grid item xs={12}>
                    <div className="bottom">
                        <div className="register">
                            <span className="text">Don't have an account? </span>
                            <A className="link" href="/auth/register">Register</A>
                        </div>
                        <A className="forgot-password" href="/auth/forgot-password">Forgot password?</A>
                    </div>
                </Grid>
            </Grid>
        </LoginForm>);
    

    async function handleSubmit(event) {
        event.preventDefault();
        if (sending) {
            return;
        }
        await setSending(true);
        try {
            let res = await ajaxRequest(
                'POST',
                `${CONFIG.API_DOMAIN}/auth/local/login`,
                {
                    username: userName.value,
                    password: password.value,
                });
            
            await clearError();
            
            
            if (res.data.success) {
                await clearError();
                navigate('/');
            } else if( res.data.success==false ) {
                setMsg(res.data.error);
            } else if (res.data === 'Unauthorized' || res.data.success==false) {
                setMsg('Invalid username or password');
            } else {
                setMsg('Some error occured.');
            }
        } catch (err) {
            console.log('Error: ', err.response.status);
            if (err.response.status === 401)
                await setMsg('Invalid username or password');
            else
                await setMsg('Network error.');
        } finally {
            await setSending(false);
        }
    }
    async function clearError() {
        await setUserName({value:userName.value, error: null});
        await setPassword({value:password.value, error: null});
    }
}
