import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, LinearProgress } from '@material-ui/core';
import { A } from 'hookrouter';
import Name from './utils/name';
import ajaxRequest from '../../../ajaxRequest';
import { API_DOMAIN } from '../../../config';


// Styled Components ========================================
let ForgotPasswordForm = styled.form`
    display: flex;
    flex-direction: column;
    .elmnts{
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .send-btn{
        width: 100%;
        align-self: center;
        border-radius: 10px;
        justify-self: center;
        align-self: center;
        font-family: SF Pro !important;
        font-style: normal !important;
        font-weight: 600 !important;
        font-size: 25px !important;
        line-height: 30px !important;
        color: #FFFFFF;
        text-transform: none !important;
        height: 60px;
        background: #065BFB !important;
    }

    .err-msg{
        background-color: #e09393;
        height: 2em;
        border-radius: 10px;
        text-align: center;
        align-content: center;
    }
    
    .btm{
        margin: 10px 0 10px 0;
    }
    .txt{
        font-size: 20px;
        line-height: 24px;
        color: rgba(66, 66, 89, 0.9);
    }
    .link{
        color: #065BFB;
        font-weight: 500;
        font-size: 23px;
        line-height: 27px;
        margin: 0 0 0 8px;
    }
`;

// ===========================================================

export default function ForgotPassword() {
    const [username, setUsername] = useState({value:'', error: null});
    const [msg, setMsg] = useState('');
    const [sending, setSending] = useState(false);
    const [mailSent, setMailSent] = useState(false);

    return mailSent ?
        <div>
            <h3>Mail has been sent to your email ({msg}).</h3>
            <p>( Also check your spam folder. )</p>
        </div>
        :
        <ForgotPasswordForm onSubmit={submitForm}>
            <h1>Forgot Password</h1>
            { sending ? <LinearProgress />
                    : msg && <div className="err-msg"> {msg} </div>
                }
            <div className="elmnts">
                <Name 
                    id="useraname-verification"
                    input={{ name: "username", label: "Username / Email", placeholder: 'Enter Username or Email' }}
                    name={username}
                    setName={setUsername} />
            </div>
            <Button
                className="elmnts send-btn"
                variant="contained"
                color="primary"
                disabled={sending}
                type="submit"
            >Send Forgot Password Token</Button>
            <div className="btm">
                <span className="txt">Already have an account?</span>
                <A
                    href="/auth/login"
                    className="link">Login</A>
            </div>
        </ForgotPasswordForm>;

    async function submitForm(event) {
        event.preventDefault();
        if (sending)
            return;
        await setSending(true);
        try {
            let res = await ajaxRequest('GET', `${API_DOMAIN}/auth/request-reset-password?username=${username.value}`);
            if (res.data.success) {
                if (res.data.mail_sent) {
                    setMsg(res.data.email);
                    setMailSent(true);
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