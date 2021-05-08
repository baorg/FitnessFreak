import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, TextField, LinearProgress } from '@material-ui/core';
import { Check } from '@material-ui/icons';

import CONFIG from '../../../config';
import ajaxRequest from '../../../ajaxRequest';

// Styled Components =================================================================

let EmailField = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 2px solid #9b9b9b;
    margin-bottom: 10px;
    /* grid-template: "header header header" "email email btn" " verified verify btn" "msg msg msg";
    grid-column: 2em 2em 2em;
    grid-row: auto auto auto auto;
    */
`;

// let EmailText = styled.div`
//     grid-area: email;
// `;

// let EditBtn = styled(Button)`
//     grid-area: btn;
//     height: 100%;
//     width: 100%;
// `;

// let EmailVerified = styled.div`
//     grid-area: verified;
// `;

// let VerifyBtn = styled.div`
//     grid-area: verify;
// `;

// let MsgArea = styled.div`
//     grid-area: msg;
// `;

let EmailHeader = styled.div`
    font-size: 20px;
    grid-area: header;
    height: 2em;
    margin-top: 4px;
`;

let AddEmailDiv = styled.div`
    display: flex;
    flex-direction: column;

    .inpt-div{
        height: fit-content;
        min-height: 2em;
        width: 100%;
    }
    .btns-div{
        display: flex;
    }
`;

let DefaultDiv = styled.div`
    display: flex;
    flex-direction: column;
    .email-container{
        display: flex;
        width: 100%;
        justify-content: space-between;
        .email-div{
            width: auto;
            max-width: 70%;
        }
    }
    
    .verified-div{
        background-color: #adadad;
        width: fit-content;
        padding: 2px;
        border-radius: 10px;
    }

    .verify-div{
        width: fit-content;
        padding: 2px;
        border-radius: 10px;
        .btn{
            background-color: #84c5ce;
            margin-left: 5px;
            margin-right: 5px;
            height: 20px;
            font-size: 0.8em;
        }
    }
`;

let NoEmailDiv = styled.div`
    display: flex;
    width: 100%;

    .email-div{
        width: 50%;
        text-align: center;
    }
    .btn-div{
        width: 50%;
        display: flex;
        align-content: center;
        justify-content: space-around;
    }
`;

let MsgField = styled.div`

`;
// ====================================================================================



export default function EmailDiv(props) {

    const [addEmail, setAddEmail] = useState(false);
    const [emailIpt, setEmailIpt] = useState("");
    const [validEmail, setValidEmail] = useState(true);
    const [error, setError] = useState("");
    const [currentDiv, setCurrentDiv] = useState(<></>);
    const [msg, setMsg] = useState(null);
    const [sending, setSending] = useState(false);
    const progressRef = useRef(null);



    useEffect(function () {
        // Regular Expression from  https://emailregex.com/
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setValidEmail(re.test(emailIpt));
    }, [emailIpt]);


    return (
        <EmailField>
            <EmailHeader>Email</EmailHeader>
            
            { addEmail ?
                <AddEmailDiv>
                    <TextField
                        error={!validEmail}
                        id="outlined-error-helper-text"
                        label={validEmail ? "Email" : "Invalid Email"}
                        defaultValue="enter email"
                        helperText={error}
                        variant="outlined"
                        className="inpt-div"
                        value={emailIpt} onChange={handleEmailChange}
                    />
                    <div className="btns-div">
                        <Button color="primary" onClick={handleSaveEmail}>Save</Button>
                        <Button color="danger" onClick={() => { setAddEmail(false); setSending(false); setEmailIpt(""); }}>Cancel</Button>
                    </div>
                    {sending && <LinearProgress />}
                </AddEmailDiv>
                : props.email === "" ?
                    <NoEmailDiv>
                        <div className="email-div">-- no email --</div>
                        <div className="btn-div">
                            <Button color="primary" onClick={handleAddClick}>Add</Button>
                        </div>
                    </NoEmailDiv>
                    : <DefaultDiv>
                        <div className="email-container">
                            <div className="email-div">{props.email.email}</div>
                            {/* <div><Button color="primary" onClick={handleAddClick}>Edit</Button></div> */}
                        </div>
                        {
                            props.email.verified ?
                                <div className="verified-div">
                                    <span>Verified</span>
                                    <Check color="primary" />
                                </div>
                                : <div className='verify-div'>
                                    <span>Not Verified</span>
                                    <Button className="btn" color="primary" onClick={sendVerificationRequest}>Resend Verification</Button>
                                </div>}
                    </DefaultDiv>}
            {msg && <MsgField>{msg}</MsgField>}
        </EmailField>

    );

    function handleAddClick() {
        // console.log("Change, ", addEmail);
        setAddEmail(true);
        setMsg(null);
    }

    function handleEmailChange(evnt) {
        setEmailIpt(evnt.target.value);
    }
    async function sendVerificationRequest() {
        let res = (await ajaxRequest('GET', `${CONFIG.API_DOMAIN}/users/request-verify-email?username=${props.user.username}`)).data;
        if (res.success) {
            setError("");
            setMsg("Verification email sent to your Mail.");
            setAddEmail(false);
        } else {
            setMsg(res.error);
        }
    }
    async function handleSaveEmail(evnt) {
        setSending(true);
        setMsg(null);

        let res = (await ajaxRequest('POST', `${CONFIG.API_DOMAIN}/users/request-update-email`, { email: emailIpt })).data;
        if (res.success) {
            setError("");
            setMsg(`Check your mail to verify and update email to ${emailIpt}.`);
            setAddEmail(false);
        } else {
            if (res.error) {
                setError(res.error);
            } else if (res.errors?.length > 0) {
                setError(res.errors[0].msg);
            } else {
                setError('Some unknow error occured.');
            }
        }
        setSending(false);
    }
}