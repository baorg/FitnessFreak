import React, { useState, useEffect } from "react";
import { navigate } from 'hookrouter';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { CloseRounded } from '@material-ui/icons'
import { TextField, Button } from '@material-ui/core';

import ajaxRequest from '../../../ajaxRequest';
import CONFIG from '../../../config';


// Styled Components =================================================================
let ModalPage = styled(Modal)`
    width: 100vw;
    min-height: 100%;
    background-color: rgb(79, 79, 79, 0.6);
    overflow-y: scroll;
    scroll-behavior: smooth;
    display: grid;
    place-items: center;
`;

let EditProfileDiv = styled.div`
    background-color: white;
    opacity: 1;
    border-radius: 10px;
    padding: 10px;
`;

let EditProfileHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

let EditProfileHeading = styled.div`
    font-size: 2.3em;
`;

let StyledCloseRounded = styled(CloseRounded)`
    background-color: #303030;
    color: white;
    font-size: 1.4em;
    border-radius: 50%;
    padding: 1px;
    cursor: pointer;
    align-self: center;
`;

let ContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

let FirstNameField = styled(TextField)`
    width: 80%;
    min-width: 100px;
    margin-bottom: 2em;
`;

let LastNameField = styled(TextField)`
    width: 80%;
    min-width: 100px;
`;

let SubmitButton = styled(Button)`
    margin-top: 2em;
`;
// ====================================================================================



export default function EditProfile(props){

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(function () {
        async function fetchData() {
            let res = (await ajaxRequest('GET', `${CONFIG.API_DOMAIN}/Users/get-userdata/`)).data;
            if (res.error === 'Not authenticated') {
                navigate('/auth');
            } else {
                let user = res.user;
                console.log('User: ', user);
                setFirstName(user.first_name || '');
                setLastName(user.last_name || '');
                setBio(user.bio || '');
                console.log('User data:', user);
            }
        }
        fetchData();
    }, []);

    return (
        <ModalPage
            open={props.open}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <EditProfileDiv>
                <EditProfileHeader>
                    <EditProfileHeading>Edit Profile</EditProfileHeading>
                    <StyledCloseRounded onClick={closeModal}/>
                </EditProfileHeader>
                <hr/>
                <ContentDiv>
                    <FirstNameField
                        id="standard-read-only-input"
                        label="First Name"
                        value={firstName}
                        onChange={(event) => { setFirstName(event.target.value); }}
                    />
                    <LastNameField
                        id="standard-read-only-input"
                        label="Last Name"
                        value={lastName}
                        onChange={(event) => { setLastName(event.target.value); }}
                    />
                    <h2>Bio</h2>
                    <textarea placeholder="Enter your bio"
                        name="bio" value={bio}
                        onChange={(event) => { setBio(event.target.value); }}
                        style={{ width: "20em", height: "20em", resize: "none" }}
                    ></textarea>
                    <br />
                    <SubmitButton onClick={updating ? () => { }:submit} disabled={updating} color="primary" variant="contained">Update</SubmitButton>
                </ContentDiv>
            </EditProfileDiv>
        </ModalPage>);

    async function submit() {
        setUpdating(true);
        let data = (await ajaxRequest('POST', `${CONFIG.API_DOMAIN}/Users/update-profile`,{
                first_name: firstName,
                last_name: lastName,
                bio: bio
            })).data;
        
        if (data.updated === true) {
            console.log('Updated....');
            props.setOpen(false);
            navigate(`/profile/${data.user._id}`);
        }
        setUpdating(false);
    }

    function closeModal() {
        props.setOpen(false);
    }
}
