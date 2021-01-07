import React, { useState } from "react"
import styled from 'styled-components';
import { LinearProgress, Button } from '@material-ui/core'


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
`;

let StyledButton = styled(Button)`
    justify-self: center;
    width: 60%;
    align-self: center;
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
            <h1>Register</h1>
            { sendingData ? <LinearProgress style={{marginBottom: "10px"}}/> : msg && <div className="err-msg"> {msg} </div>}
            <div className="form-group">
                <div className="form-row">
                    <div className="form-col" style={{width: "100%"}}>
                        <Name
                            id="username-register"
                            input={{ name: "username", label: "Username", max_length: "20", placeholder: 'Enter username', required: true }}
                            name={userName}
                            setName={setUserName} />
                    </div>
                </div>
            </div>
            <div className="form-group" >
                <div className="form-row" style={{justifyContent: "space-evenly"}}>
                    <div className="form-col" style={{width: "48%"}}>
                        <Name
                            id="firstname-register"
                            input={{ name: "firstname", label: "FirstName", max_length: "20", placeholder: 'Enter First Name' }}
                            name={firstName}
                            setName={setFirstName} />
                    </div>
                    <div className="form-col" style={{width: "48%"}}>
                        <Name
                            id="lastname-register"
                            input={{ name: "lastname", label: "LastName", max_length: "20", placeholder: 'Enter Last Name' }}
                            name={lastName}
                            setName={setLastName} />
                    </div>
                </div>
            </div>
            <div className="regstr-mail form-group">
                <Email
                    id="email-register"
                    input={{ name: "email", label: "Email", placeholder: "Enter email" }}
                    email={email}
                    setEmail={setEmail}
                />
            </div>
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
            <StyledButton
                type="submit"
                id="rgstr-btn"
                variant="contained"
                color="primary"
                disabled={sendingData}
            >Register</StyledButton>
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
