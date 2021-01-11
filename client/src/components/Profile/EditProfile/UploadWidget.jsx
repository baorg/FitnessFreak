import React from 'react'
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'
import styled from 'styled-components';

import { API_DOMAIN, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY } from '../../../config';

// Styled Components ==============================================================================

let StyledWidget = styled(Widget)`
    color: blue;
    border: none;
    background-color: white;
    width: 120px;
    border-radius: 4px;
    height: 25px;
`;

let StyledWidgetLoader = styled(WidgetLoader)`
    color: blue;
    border: none;
    background-color: white;
    width: 120px;
    border-radius: 4px;
    height: 25px;
`;

// ================================================================================================


export default function UploadWidget({eager, uploadPreset, successCallBack, failureCallBack}){
    return (
        <>
            <StyledWidgetLoader />
            <StyledWidget
                sources={['local', 'camera']} // set the sources available for uploading -> by default
                // all sources are available. More information on their use can be found at 
                // https://cloudinary.com/documentation/upload_widget#the_sources_parameter

                // and ID's as an object. More information on their use can be found at
                // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
                resourceType={'image'} // optionally set with 'auto', 'image', 'video' or 'raw' -> default = 'auto'
                cloudName={CLOUDINARY_CLOUD_NAME} // your cloudinary account cloud name. 

                // Located on https://cloudinary.com/console/
                uploadPreset={uploadPreset} // check that an upload preset exists and check mode is signed or unisgned
                buttonText={'Edit'} // default 'Upload Files'
                folder={'fitness_freak'} // set cloudinary folder name to send file
                cropping={true} // set ability to crop images -> default = true
                onSuccess={successCallBack} // add success callback -> returns result
                onFailure={failureCallBack} // add failure callback -> returns 'response.error' + 'response.result'
                logging={true} // logs will be provided for success and failure messages, 
                // set to false for production -> default = true
                
                customPublicId={'sample'} // set a specific custom public_id. 
                // To use the file name as the public_id use 'use_filename={true}' parameter
                eager={eager} // add eager transformations -> deafult = null
                use_filename={false} // tell Cloudinary to use the original name of the uploaded 
                // file as its public ID -> default = true,
 
                // 👇 FOR SIGNED UPLOADS ONLY 👇
                generateSignatureUrl={`${API_DOMAIN}/cloudinary/generate_signature`} // pass the api
                // endpoint for generating a signature -> check cloudinary docs and SDK's for signing uploads
                apiKey={CLOUDINARY_API_KEY} // cloudinary API key -> number format
                accepts={'application/json'} // for signed uploads only -> default = 'application/json'
                contentType={'application/json'} // for signed uploads only -> default = 'application/json'
                withCredentials={true} // default = true -> check axios documentation for more information
                unique_filename={true} // setting it to false, you can tell Cloudinary not to attempt to make 
            // the Public ID unique, and just use the normalized file name -> default = true
            />
        </>
    );
}