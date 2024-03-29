import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { navigate } from 'hookrouter';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { CloseRounded } from '@material-ui/icons'
import { TextField, Button, Divider } from '@material-ui/core';

import ajaxRequest from '../../../ajaxRequest';
import CONFIG from '../../../config';
import EmailDiv from "./email";
import EditProfileImage from "./ProfileImage";
import EditProfileBanner from "./ProfileBanner";

import { responsive } from '../../utils/data.json';

// Styled Components =================================================================

let StyledSpinner = styled(Spinner)`
    width: 100px;
    height: 100px;
    color: rgba(12,12,12);
`;
let ModalPage = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(45, 45, 45, 0.6);
    z-index: 1500;
    overflow: auto;
    font-family: SF Pro;
    font-style: normal;
    
    .container{
        width: 100%;
        height: calc(fit-content + 50px);
        display: grid;
        place-content: center;
    }
`;

let EditProfileDiv = styled.div`
    z-index: 1500;
    align-self: center;
    background-color: white;
    opacity: 1;
    height: fit-content;
    border-radius: 10px;
    padding: 10px;
    margin: 50px 0 30px 0;
    width: 100vw;
    max-width: 600px;
    min-height: 40em;
    display: flex;
    flex-direction: column;
`;

let EditProfileHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0 10px 0;
`;

let EditProfileHeading = styled.div`
    font-weight: 600;
    font-size: 27px;
    line-height: 32px;
    color: #424259;
`;

let StyledCloseRounded = styled(CloseRounded)`
    color: #424259;
    font-size: 1.4em;
    border-radius: 50%;
    padding: 1px;
    cursor: pointer;
    align-self: center;
`;

let ContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    padding: 12px;
    margin-top: 20px;
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    color: #43405B;
    /* border-top: 2px solid rgba(104, 104, 104, 0.904);  */
    >*{
        margin-top: 15px;
    }
    .head{
        font-size: 25px;
        align-self: flex-start;
    }
`;

let ElementDiv = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
    display: flex;
    justify-content: space-around;
`;

let FirstNameField = styled(TextField)`
    width: 100%;
    min-width: 100px;
    margin-bottom: 2em;
`;

let BioField = styled.div`
    width: 100%;
    box-sizing: border-box;
`;

let FooterDiv = styled.div`
    height: 4em;
    width: 100%;
    display: grid;
    place-items: center;
`;
let LastNameField = styled(TextField)`
    width: 100%;
    min-width: 100px;
`;

let SubmitButton = styled(Button)`
    margin-top: 2em;
    width: 100%;
    color: #FFFFFF !important;
    background: #065BFB !important;
    border-radius: 9px;
    font-size: 20px;
    line-height: 24px;

`;
// ====================================================================================



export default function EditProfile({user, setUser, open, setOpen}){

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(function () {
        async function fetchData() {
            setLoading(true);
            let res = (await ajaxRequest('GET', `${CONFIG.API_DOMAIN}/Users/get-userdata/`)).data;
            if (res.error === 'Not authenticated') {
                navigate('/auth');
            } else {
                let user = res.user;
                console.log('User: ', user);
                setFirstName(user.first_name || '');
                setLastName(user.last_name || '');
                setBio(user.bio || '');
                setEmail(user.email || '');
                console.log('User data:', user);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <ModalPage
            open={open}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            disableScrollLock={false}
            disableBackdropClick={true}
            onClose={() => { setOpen(false); }}>
            <div className="container">
                <EditProfileDiv>
                <EditProfileHeader>
                    <EditProfileHeading>Edit Profile</EditProfileHeading>
                    <StyledCloseRounded onClick={closeModal}/>
                </EditProfileHeader>
                <Divider />
                {loading ?
                    <StyledSpinner />
                    :
                    <>
                        <EditProfileImage user={user} setUser={setUser} />
                        <Divider />
                        <EditProfileBanner user={user} setUser={setUser} />
                        <Divider />
                        <ContentDiv>
                            <div className="head">Info</div>
                            <ElementDiv>
                                <FirstNameField
                                    id="standard-read-only-input"
                                    label="First Name"
                                    value={firstName}
                                    onChange={(event) => { setFirstName(event.target.value); }}
                                />
                            </ElementDiv>
                            <ElementDiv>
                                <LastNameField
                                    id="standard-read-only-input"
                                    label="Last Name"
                                    value={lastName}
                                    onChange={(event) => { setLastName(event.target.value); }}
                                />
                            </ElementDiv>
                            <ElementDiv>
                                <BioField>
                                    <h2>Bio</h2>
                                    <textarea placeholder="Enter your bio"
                                        name="bio" value={bio}
                                        onChange={(event) => { setBio(event.target.value); }}
                                        style={{ width: "100%", padding: "5px", height: "10em", resize: "none" }}
                                        ></textarea>
                                </BioField>
                            </ElementDiv>
                            <FooterDiv>
                                <SubmitButton onClick={updating ? () => { }:submit} disabled={updating} color="primary" variant="contained">Update</SubmitButton>
                            </FooterDiv>
                        </ContentDiv>
                        <Divider />
                        <EmailDiv email={email} />
                    </>
                }
                </EditProfileDiv>
            </div>
        </ModalPage>
    );

    async function submit() {
        setUpdating(true);
        let data = (await ajaxRequest('POST', `${CONFIG.API_DOMAIN}/Users/update-profile`,{
                first_name: firstName,
                last_name: lastName,
                bio: bio
            })).data;
        
        if (data.updated === true) {
            console.log('Updated....');
            setOpen(false);
            navigate(`/profile/${data.user._id}`);
        }
        setUpdating(false);
    }

    function closeModal() {
        setOpen(false);
    }
}
