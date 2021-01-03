import React, { useState } from "react"
import ajaxRequest from '../../../ajaxRequest'
import CONFIG from '../../../config'
import styled from 'styled-components';

import { Name, Password, PasswordCheck, Email } from './utils';


// Styled Components =========================================================
let StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

let StyledButton = styled.button`
    justify-self: center;
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

    async function clearError() {
        await setUserName({value:userName.value, error: null});
        await setFirstName({value:firstName.value, error: null});
        await setLastName({value:lastName.value, error: null});
        await setPassword1({value:password1.value, error: null});
        await setPassword2({value:password2.value, error: null});
        await setEmail({value:email.value, error: null});
    }

    async function clearData() {
        await setUserName({value:'' , error: null});
        await setFirstName({value:'' , error: null});
        await setLastName({value:'' , error: null});
        await setPassword1({value:'' , error: null});
        await setPassword2({value:'' , error: null});
        await setEmail({value:'' , error: null});
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        // document.getElementById('rgstr-btn')
        if (sendingData) {
            console.log('Already sending data.')
            return;
        }
        
        changeSendingData(true);
        document.getElementById('rgstr-btn').style.cursor = 'not-allowed';
        document.getElementById('rgstr-btn').onclick = () => { };

        
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
        ).then(async res => {
            await clearError();
            if (res.data.success) {
                alert('You have been registered. Now login.');
                clearData();
            } else {
                res.data.errors.forEach(err => {
                    if (err.param === 'username')
                        setUserName({ value: userName.value, error: err.msg });
                    else if (err.param === 'email')
                        setEmail({ value: email.value, error: err.msg });
                    else if (err.param === 'password1')
                        setPassword1({ value: password1.value, error: err.msg });
                    else if (err.param === 'password2')
                        setPassword2({ value: password2.value, error: err.msg });
                    else if (err.param === 'firstname')
                        setFirstName({ value: firstName.value, error: err.msg });
                    else if (err.param === 'lastname')
                        setLastName({ value: lastName.value, error: err.msg });
                });
            }
            document.getElementById('rgstr-btn').style.cursor = 'pointer';
            document.getElementById('rgstr-btn').onclick = handleSubmit;
            changeSendingData(false);
        }).catch(err => {
            document.getElementById('rgstr-btn').style.cursor = 'pointer';
            document.getElementById('rgstr-btn').onclick = handleSubmit;
            changeSendingData(false);
        });
    }

    return (
        <div>
            <h1>Register</h1>
            <StyledForm action="" className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <span>Username</span>
                    <div className="form-row">
                        <div className="form-col">
                        <Name
                            id="username-register"
                            input={{ name: "username", label: "Username", max_length: "20", placeholder: 'Enter username' }}
                            name={userName}
                            setName={setUserName} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <span>Full Name</span>
                    <div className="form-row">
                        <div className="form-col">
                            <Name
                                id="firstname-register"
                                input={{ name: "firstname", label: "FirstName", max_length: "20", placeholder: 'Enter First Name' }}
                                name={firstName}
                                setName={setFirstName} />
                        </div>
                        <div className="form-col">
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
                        input={{ name: "email", label: "Email", placeholder:"Enter email" }}
                        email={email}
                        setEmail={setEmail}
                    />
                </div>
                    <Password 
                        id="password-1-register"
                        input={{label:"Password", placeholder: "enter password", name:'password1'}}
                        password={password1}
                        setPassword={setPassword1}
                    />
                    <PasswordCheck 
                        id="password-2-register"
                        input={{ label: "Retype Password", placeholder: "enter password again please!", name: 'password2' }}
                        password1={password1} password2={password2}
                        setPassword2={setPassword2}
                    />
                    <StyledButton type="submit" className="btn " id="rgstr-btn" >Register</StyledButton>
            </StyledForm>
        </div>);
}
