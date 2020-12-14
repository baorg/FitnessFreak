import React, { useState } from "react"
import { navigate } from 'hookrouter';
import ajaxRequest from '../../../ajaxRequest'
import CONFIG from '../../../config.json'

import { Name, Password } from './utils';


export default function Login(props) {
    const [userName, setUserName] = useState({value:'', error: null});
    const [password, setPassword] = useState({value:'', error: null});
    
    async function clearError() {
        await setUserName({value:userName.value, error: null});
        await setPassword({value:password.value, error: null});
    }

    async function handleSubmit(event) {
        event.preventDefault();
        ajaxRequest(
            'POST',
            CONFIG.API_DOMAIN + '/auth/local/login',
            {
                username: userName.value,
                password: password.value,
            }
        ).then(async res => {
            await clearError();
            if (res.data.success) {
                clearError();
                navigate('/');
            } else {
                res.data.errors.forEach(err => {
                    if (err.param === 'username')
                        setUserName({ value: userName.value, error: err.msg });
                    else if (err.param === 'password')
                        setPassword({ value: password.value, error: err.msg });
                });
            }
        }).catch(err => {
            
        });
    }

    return (
        <div>
            <h1>Login</h1>
            <form action="/auth/local/login/" method="post" onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="email">Enter Username</label>
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
                <button type="submit" className="btn">Login</button>
            </form>
        </div>);
}
