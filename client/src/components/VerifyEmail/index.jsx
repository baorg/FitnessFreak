import React, { useState, useEffect } from 'react';
import { useQueryParams } from 'hookrouter';
import { LinearProgress, Paper } from '@material-ui/core';
import styled from 'styled-components';


import ajaxRequest from '../../ajaxRequest';
import { API_DOMAIN } from '../../config';
import {HTML404} from '../ErrorPage/Error'
import TokenExpired from './expired';
import TokenInvalid from './invalid';
import TokenVerified from './verified';
import Navbar from '../Navigation/navbar/navbar';
import RedirectTimer from './redirect_timer';

// Styled Components =========================================================================

let MainDiv = styled.div`
    min-height: 100vh;
    display: grid;
    place-items: center;
`;

let ContentDiv = styled(Paper)`
    padding: 20px 10px 20px 10px;
`;
// =============================================================================================



export default function Verify(props) {
    const [queryParams, setQueryParams] = useQueryParams();
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchData() {
            setVerifying(true);
            setTimeout(() => {
                setVerified(true);
                setVerifying(false);
            }, 1000);

            if (queryParams.hasOwnProperty('token')) {
                let res_data = (await ajaxRequest('GET', `${API_DOMAIN}/auth/verify-user-email?token=${queryParams}`)).data
                if (res_data.success) {
                    if (res_data.email_verified) {
                        setVerified(true);
                        setEmailVerified(true);
                    } else {
                        setVerified(true);
                        setEmailVerified(false);
                        setError('Some error occured.');
                    }
                } else {
                    setVerified(false);
                    setEmailVerified(false);
                    setError(res_data.error);
                }
            }
            setVerifying(false);
        }

        fetchData();
        return () => {
        }
    }, [])


    return (
        <>
        <Navbar />
        <MainDiv>
            <ContentDiv>
                    <h1>Verifying your token.</h1>
                    {verifying && <LinearProgress />}
                    {verified &&
                        emailVerified ? <>
                                            <p>Email verified</p>
                                            <RedirectTimer ttl={10} redirectURL="/" />
                        </>
                        : <>
                            <p>{error}</p>
                            <p>Please try again.</p>
                        </>
                        }
            </ContentDiv>
        </MainDiv>
        </>
    );
}