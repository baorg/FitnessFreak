import React from 'react';
import styled from 'styled-components';
import { Avatar, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import UploadWidget from "./UploadWidget";

import noimage from '../../../static/noimage.png';
import { API_DOMAIN } from '../../../config';
import ajaxRequest from '../../../ajaxRequest';
// Styled Components ===========================================================================

let EditProfileImageDiv = styled.div`
    padding: 10px 4px 10px 4px;
    margin: 10px 0 10px 0;
    display: flex;
    flex-direction: column;
    width: 100%;

    .heading{
        font-size: 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 2px 5px 2px 5px;

        .text{
            font-size: 25px;
        }
        .head-btn{
            font-size: 18px;
        }
    }

    .profile-img-container{
        align-self: center;
        width: 200px;
        height: 200px;
        .profile-img{
            width: 100%;
            height: 100%;
            background-color: rgba(187, 187, 187, 0.575);
        }
        .add-icon{
            position: relative;
            width: 60%;
            height: 60%;
            top: -80%;
            left: 20%;
            font-size: 1em;
        }
    }
    
    #cloudinary_upload_button{
        background-color: white;
        border-radius: 4px;
        padding: 5px 10px 5px 10px;
        color: rgb(63, 81, 181);
        border-style: none;

        :hover{
            background-color: #eeeeee;
        }
    }
`;
let ProfileImage = styled.div`

`;

// =============================================================================================

export default function EditProfileImage({ user, setUser }) {

    return (
        <EditProfileImageDiv>
            <div className="heading">
                <div className="text" >Profile Image</div>
                <UploadWidget
                    eager='c_fit,h_600,r_0,w_600'
                    uploadPreset='fzi0eowg'
                    successCallBack={successCallBack}
                    failureCallBack={failureCallBack}
                />
            </div>
            <ProfileImage className="profile-img-container">
                <Avatar className="profile-img" alt="update-image" src={ user.profile_image || noimage } />
            </ProfileImage>

        </EditProfileImageDiv>
    );

    async function  successCallBack(result) {
        console.log('Result: ', result);
        let res = (await ajaxRequest('POST', `${API_DOMAIN}/users/update-image`, {
            image_url: result.info.secure_url,
            target: 'profile'
        })).data;
        setUser({ ...user, profile_image: result.info.secure_url });
    }
    
    function failureCallBack(err) {
        console.log('ERROR: ', err);
    }
}