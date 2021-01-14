import React from 'react';
import styled from 'styled-components';
// import { Avatar, Button } from '@material-ui/core';
// import { Add } from '@material-ui/icons';
import UploadWidget from "./UploadWidget";

import nobanner from '../../../static/placeholder_profile_banner.jfif';
import { API_DOMAIN } from '../../../config';
import ajaxRequest from '../../../ajaxRequest';
// Styled Components ===========================================================================

let EditProfileBannerDiv = styled.div`
    padding: 10px 4px 10px 4px;
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
            background-color: blue;
        }
    }

    .profile-img-container{
        align-self: center;
        max-width: 600px;
        height: 200px;
        .profile-img{
            width: 100%;
            height: 100%;
            border-radius: 10px;
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
let BannerImage = styled.div`

`;

// =============================================================================================

export default function EditProfileBanner({ user, setUser }) {
    
    return (
        <EditProfileBannerDiv>
            <div className="heading">
                <div className="text" >Profile Banner</div>
                <UploadWidget
                    eager='c_scale,h_200,w_600'
                    uploadPreset='ikls5mmd'
                    successCallBack={successCallBack}
                    failureCallBack={failureCallBack}
                />
            </div>
            <BannerImage className="profile-img-container">
                <img className="profile-img" alt="update-image" src={user.banner_image || nobanner} />
            </BannerImage>

        </EditProfileBannerDiv>
    );

    async function  successCallBack(result) {
        console.log('Result: ', result);
        let res = (await ajaxRequest('POST', `${API_DOMAIN}/users/update-image`, {
            image_url: result.info.secure_url,
            target: 'banner'
        })).data;
        setUser({ ...user, banner_image: result.info.secure_url });
    }
    
    function failureCallBack(err) {
        console.log('ERROR: ', err);
    }
}