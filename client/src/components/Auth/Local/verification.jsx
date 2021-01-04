import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, LinearProgress } from '@material-ui/core';

import Name from './utils/name';
import ajaxRequest from '../../../ajaxRequest';
import { API_DOMAIN } from '../../../config';


// Styled Components ========================================
let VerificationForm = styled.form`
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

function Verification() {
    const [username, setUsername] = useState({value:'', error: null});
    const [msg, setMsg] = useState('');
    const [sending, setSending] = useState(false);
    const [mailSent, setMailSent] = useState(false);

    return mailSent ?
        <div>
            <h3>Mail has been sent to your email.</h3>
            <p>( Also check your spam folder. )</p>
        </div>
        :
        <VerificationForm onSubmit={submitForm}>
            <h1>Verify Email</h1>
            { sending ? <LinearProgress />
                    : msg && <div className="err-msg"> {msg} </div>
                }
            <div className="elmnts">
                <Name 
                    id="useraname-verification"
                    input={{ name: "username", label: "Username", placeholder: 'Enter Username' }}
                    name={username}
                    setName={setUsername} />
            </div>
            <Button
                className="elmnts send-btn"
                variant="contained"
                color="primary"
                disabled={sending}
                type="submit"
            >Send Verfication Mail </Button>
        </VerificationForm>;

    async function submitForm(event) {
        event.preventDefault();
        if (sending)
            return;
        await setSending(true);
        try {
            let res = await ajaxRequest('GET', `${API_DOMAIN}/users/request-verify-email?username=${username.value}`);
            if (res.data.success) {
                if (res.data.mail_sent) {
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

export default Verification;