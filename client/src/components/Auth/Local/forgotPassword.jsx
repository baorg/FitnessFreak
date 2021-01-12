import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, LinearProgress } from '@material-ui/core';

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