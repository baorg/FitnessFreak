import React, { useState } from "react"
import styled from 'styled-components';
import {
    LinearProgress, Button,
    Grid
} from '@material-ui/core'
import { A } from 'hookrouter';

import { Name, Password, PasswordCheck, Email } from './utils';
import CONFIG from '../../../config'
import ajaxRequest from '../../../ajaxRequest'


// Styled Components =========================================================

let StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    .err-msg{
        background-color: #e09393;
        height: 2em;
        border-radius: 10px;
        text-align: center;
        align-content: center;
        margin-bottom: 10px;
    }

    .form-heading{
        font-weight: 600;
        font-size: 27px;
        line-height: 32px;
        color: #424259;
        margin: 0 0 10px 0;
    }
    .form-subheading{
        font-size: 20px;
        line-height: 24px;
        color: rgba(66, 66, 89, 0.9);
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

let StyledButton = styled(Button)`
    justify-self: center;
    width: 100%;
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
    border-radius: 9px;
`;

// ==============================================================================

export default function Register(props) {
    const [userName, setUserName] = useState({value:'', error: null});
    const [firstName, setFirstName] = useState({value:'', error: null});
    const [lastName, setLastName] = useState({value:'', error: null});
    const [password1, setPassword1] = useState({value:'', error: null});
    const [password2, setPassword2] = useState({value:'', error: null});
    const [email, setEmail] = useState({value:'', error: null});
    const [sendingData, changeSendingData] = useState(false);
    const [msg, setMsg] = useState(null);


    return (
        <StyledForm action="" className="form-container" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className="form-heading">Hello there !</div>
                    <div className="form-subheading">Please fill some details to get started.</div>
                </Grid>
                <Grid item xs={12}>
                {sendingData ?
                    <LinearProgress style={{ marginBottom: "10px" }} /> :
                        msg && <div className="err-msg"> {msg} </div>}
                </Grid>
                <Grid item xs={12}>
                    <Name
                        id="username-register"
                        input={{ name: "username", label: "Username", max_length: "20", placeholder: 'Enter username', required: true }}
                        name={userName}
                        setName={setUserName} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Name
                        id="firstname-register"
                        input={{ name: "firstname", label: "FirstName", max_length: "20", placeholder: 'Enter First Name' }}
                        name={firstName}
                        setName={setFirstName} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Name
                        id="lastname-register"
                        input={{ name: "lastname", label: "LastName", max_length: "20", placeholder: 'Enter Last Name' }}
                        name={lastName}
                        setName={setLastName} />
                </Grid>
                <Grid item xs={12}>
                    <Email
                        id="email-register"
                        input={{ name: "email", label: "Email", placeholder: "Email" }}
                        email={email}
                        setEmail={setEmail}/>
                </Grid>
                <Grid item xs={12}>
                    <Password
                        id="password-1-register"
                        input={{ label: "Password", placeholder: "Password", name: 'password1' }}
                        password={password1}
                            setPassword={setPassword1} />
                </Grid>
                <Grid item xs={12}>
                    <PasswordCheck
                        id="password-2-register"
                        input={{ label: "Retype Password", placeholder: "Retype your password", name: 'password2' }}
                        password1={password1} password2={password2}
                            setPassword2={setPassword2} />
                </Grid>
                <Grid item xs={12}>
                    <StyledButton
                        type="submit"
                        id="rgstr-btn"
                        variant="contained"
                        color="primary"
                        disabled={sendingData}>Register</StyledButton>
                </Grid>
                <Grid item xs={12}>
                        <span className="txt">Already have an account?</span>
                        <A
                            href="/auth/login"
                            className="link">Login</A>
                </Grid>
            </Grid>
        </StyledForm>);

    function handleSubmit(event) {
        event.preventDefault();
        // document.getElementById('rgstr-btn')
        if (sendingData) {
            console.log('Already sending data.');
            return;
        }
        changeSendingData(true);
        ajaxRequest(
            'POST',
            CONFIG.API_DOMAIN + '/auth/local/register',
            {
                username: userName.value,
                firstname: firstName.value,
                lastname: lastName.value,
                password1: password1.value,
                password2: password2.value,
                email: email.value
            }
        ).then(res => {
            clearError();
            if (res.data.success) {
                console.log('Success......');
                alert('You have been registered. Now login.');
                clearData();
            } else {
                setMsg(null);
                res.data.errors.forEach(err => {
                    if (err.param === 'username'){
                        console.log('User error');
                        setUserName({ value: userName.value, error: err.msg });
                    }
                    if (err.param === 'email') {
                        console.log('email error');
                        setEmail({ value: email.value, error: err.msg });
                    }
                    if (err.param === 'password1'){
                        console.log('Pass1 error');
                        setPassword1({ value: password1.value, error: err.msg });
                    }
                    if (err.param === 'password2') {
                        console.log('Pass2 error');
                        setPassword2({ value: password2.value, error: err.msg });
                    }
                    if (err.param === 'firstname') {
                        console.log('FName error');
                        setFirstName({ value: firstName.value, error: err.msg });
                    }
                    if (err.param === 'lastname') {
                        console.log('LName error');
                        setLastName({ value: lastName.value, error: err.msg });
                    }
                });
            }
        }).catch(err => {
            console.error('ERROR:', err);
            setMsg("Connection error.");
        }).finally(() => {
            changeSendingData(false);
        });
    }

    function clearError() {
        setUserName({value:userName.value, error: null});
        setFirstName({value:firstName.value, error: null});
        setLastName({value:lastName.value, error: null});
        setPassword1({value:password1.value, error: null});
        setPassword2({value:password2.value, error: null});
        setEmail({value:email.value, error: null});
    }

    async function clearData() {
        await setUserName({value:'' , error: null});
        await setFirstName({value:'' , error: null});
        await setLastName({value:'' , error: null});
        await setPassword1({value:'' , error: null});
        await setPassword2({value:'' , error: null});
        await setEmail({value:'' , error: null});
    }

    
}
