import React, { useState } from "react"
import { navigate, A } from 'hookrouter';
import styled from 'styled-components';


import { LinearProgress, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


import ajaxRequest from '../../../ajaxRequest'
import CONFIG from '../../../config';
import { Name, Password } from './utils';


// Styled Components ======================================================

let LoginForm = styled.form`
    display: flex;
    flex-direction: column;

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
        justify-content: space-evenly;
        margin-top: 10px;
    }
`;

let StyledButton = styled(Button)`
    justify-self: center;
    width: 60%;
    align-self: center;
`;
// =========================================================================


export default function Login(props) {
    const [userName, setUserName] = useState({value:'', error: null});
    const [password, setPassword] = useState({value:'', error: null});
    const [msg, setMsg] = useState('');
    const [sending, setSending] = useState(false);

    return (
        <LoginForm method="post" onSubmit={handleSubmit} className="form-container" >
            <h1>Login</h1>
            <div className="action-div">
            { sending ? <LinearProgress />
                : msg && <Alert severity="error">{msg}</Alert>
            }
            </div>
            
            <div className="form-group">
                <Name
                    id="username-login"
                    input={{ name: "username", label: "Username", max_length: "20", placeholder: 'Enter username' }}
                    name={userName}
                    setName={setUserName} />
            </div>
            <Password 
                id="password-login"
                input={{label:"Password", placeholder: "enter password", name:'password'}}
                password={password}
                setPassword={setPassword}
            />
            <StyledButton
                type="submit"
                id="login-btn"
                variant="contained"
                color="primary"
                disabled={sending}
            >Login</StyledButton>

            {/* <Button type="submit" className="btn" disabled={sending} >Login</Button> */}

            <div className="bottom">
                <A href="/auth/send-verification">Send Verification</A>
                <A href="/auth/forgot-password">Forgot password?</A>
            </div>
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
