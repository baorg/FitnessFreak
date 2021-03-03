import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, LinearProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


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

    .action-div{
        width: 100%;
        box-sizing: border-box;
        padding: 1em 0 1em 0;
        .err-msg{
            height: 2em;
            border-radius: 10px;
            text-align: center;
            align-content: center;
        }
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
            <h3>Mail has been sent to your email. ({ msg })</h3>
            <p>( Also check your spam folder. )</p>
        </div>
        :
        <VerificationForm onSubmit={submitForm}>
            <h1>Verify Email</h1>
                <div className="action-div">
                { sending ? <LinearProgress />
                    : msg && <Alert severity={mailSent?"success":"error"}>{msg}</Alert>
                }
                </div>
            <div className="elmnts">
                <Name 
                    id="useraname-verification"
                    input={{ name: "username", label: "Username / Email", placeholder: 'Enter Username / Email' }}
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
        
        setSending(true);
        try {
            let res = await ajaxRequest('GET', `${API_DOMAIN}/users/request-verify-email?username=${username.value}`);
            console.log("Respononse: ", res.data);
            
            if (res.data.success) {
                if (res.data.mail_sent) {
                    setMailSent(true);
                    setMsg(`Mail sent to ${res.data.email}`);
                }else {
                    setMailSent(false);
                    setMsg(`Some error occurred in sending mail to ${res.data.email}`);
                }
            } else {
                setMailSent(false);
                setMsg(res.data.error || "Some error occured");
            }
        } catch (err) {
            console.error("ERROR: ", err);
        } finally {
            setSending(false);    
        }
    }
}

export default Verification;