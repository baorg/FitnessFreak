import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, LinearProgress } from '@material-ui/core';
import { useQueryParams, A } from 'hookrouter';

import Password from './utils/password';
import PasswordCheck from './utils/check_password';
import ajaxRequest from '../../../ajaxRequest';
import { API_DOMAIN } from '../../../config';


// Styled Components ========================================
let ResetPasswordForm = styled.form`
    display: flex;
    flex-direction: column;
    .elmnts{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .send-btn{
        width: 60%;
        align-self: center;
        border-radius: 10px;
    }

    .err-msg{
        background-color: #e09393;
        height: 2em;
        border-radius: 10px;
        text-align: center;
        align-content: center;
    }
    .link{
        color: #065BFB;
        font-weight: 500;
        font-size: 23px;
        line-height: 27px;
        margin: 0 0 0 8px;
    }
`;

let PasswordChanged = styled.div`
    .link{
        color: #065BFB;
        font-weight: 500;
        font-size: 23px;
        line-height: 27px;
        margin: 0 0 0 8px;
    }
`;
// ===========================================================

function Verification() {
    const [username, setUsername] = useState({value:'', error: null});
    const [msg, setMsg] = useState('');
    const [sending, setSending] = useState(false);
    const [ passwordChanged, setPasswordChanged] = useState(false);
    const [password1, setPassword1] = useState({ value: "", error: null });
    const [ password2, setPassword2 ] = useState({value: "", error: null});
    
    const [queryParams, setQueryParams] = useQueryParams();
    const { token = "" } = queryParams;

    return passwordChanged ?
        <PasswordChanged>
            <h3>Your password have been changed</h3>
            <A
                href="/auth/login"
                className="link">Login</A>
        </PasswordChanged>
    :    <ResetPasswordForm onSubmit={submitForm}>
        <h1>Reset Password</h1>
        {sending ? <LinearProgress /> : msg && <div className="err-msg"> {msg} </div>}
        <Password
            id="password-1-register"
            input={{ label: "Password", placeholder: "enter password", name: 'password1' }}
            password={password1}
            setPassword={setPassword1}
        />
        <PasswordCheck
            id="password-2-register"
            input={{ label: "Retype Password", placeholder: "enter password again please!", name: 'password2' }}
            password1={password1} password2={password2}
            setPassword2={setPassword2}
        />
        <Button
            className="elmnts send-btn"
            variant="contained"
            color="primary"
            disabled={sending}
            type="submit">Reset Password</Button>
        <A
            href="/auth/login"
            className="link">Login</A>
    </ResetPasswordForm>;

    async function submitForm(event) {
        event.preventDefault();
        if (sending)
            return;
        await setSending(true);
        try {
            let res = await ajaxRequest('POST', `${API_DOMAIN}/auth/reset-password`,
                {
                    password1: password1.value,
                    password2: password2.value,
                    token: token
                });
            if (res.data.success) {
                if (res.data.password_reset) {
                    setPasswordChanged(true);
                }
            } else {
                setMsg(res.data.error);
                setSending(false);
            }
        } catch (err) {
            
        } finally {
            
        }
    }
}

export default Verification;