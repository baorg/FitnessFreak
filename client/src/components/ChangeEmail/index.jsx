import React, { useState, useEffect } from 'react';
import { useQueryParams } from 'hookrouter';
import styled from 'styled-components';
import { LinearProgress, Paper } from '@material-ui/core';

import ajaxRequest from '../../ajaxRequest';
import { API_DOMAIN } from '../../config';
import Timer from '../utils/Timer';

// Styled Components ================================================================================

let MainDiv = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;

    .cntr-div{
        width: 50%;
        height: 60%;
        min-width: fit-content;
        min-height: fit-content;
        display: flex;
        flex-direction: column;
    }
    .header{
        font-size: 30px;
        align-self: center;
    }

    .err{
        font-size: 25px;
        align-self: center;
    }
`;

// ==================================================================================================


export default function () {
    const [ queryParams, setQueryParams ] = useQueryParams();
    const [ verifying, setVerifying ] = useState(true);
    const [ emailVerified, setEmailVerified ] = useState(false);
    const [ error, setError ] = useState("");

    useEffect(() => {
        async function fetchData() {
            setVerifying(true);

            if (queryParams.hasOwnProperty('token')) {
                let token = queryParams.token;
                let res_data = (await ajaxRequest('POST', `${API_DOMAIN}/users/update-email`, { token: token })).data;
                if (res_data.success) {
                    if (res_data.email_updated) {
                        setEmailVerified(true);
                    } else {
                        setEmailVerified(false);
                        setError('Some error occured.');
                    }
                } else {
                    setEmailVerified(false);
                    setError(res_data.error);
                }
            }
            setVerifying(false);
        }

        fetchData();

    }, []);


    return (
        <MainDiv>
            <Paper
                elevation={3}
                className="cntr-div"
            >
                <div className="header">
                    Update Email
                     <hr />
                </div>
                {verifying && <LinearProgress />}
                {emailVerified ?
                    <div>
                        <div>Your email is Verified.</div>
                        <div>Redirecting in
                            <Timer
                                ttl={10} 
                                onTimerEnd = {onSuccessredirect}
                                />
                        </div>
                    </div> :
                    <div className="err">
                        {error}
                    </div>
                    }
            </Paper>
        </MainDiv>
    );

    function onSuccessredirect() {
        let redirectURL = `/`;
        window.location.href = redirectURL;
    }
}