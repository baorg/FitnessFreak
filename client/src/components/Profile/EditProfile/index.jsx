import React, { useState, useEffect } from "react";
import { navigate } from 'hookrouter';
import ajaxRequest from '../../../ajaxRequest';
import CONFIG from '../../../config.json';

const styleClasses = {
    cover_div: {
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeContent: 'center'
    },
    update_div: {
        width: '25em',
        marginLeft: '10em',
    },
    name: {
        size:'2em'
    }
}

const EditProfile = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');

    useEffect(async () => {
        let user_data = (await ajaxRequest('GET', `${CONFIG.API_DOMAIN}/Users/get-userdata/`)).data.user;
        setFirstName(user_data.first_name || '');
        setLastName(user_data.last_name || '');
        setBio(user_data.bio || '');
        console.log('User data:', user_data);
    }, []);

    async function submit() {
        let data = (await ajaxRequest('POST', `${CONFIG.API_DOMAIN}/Users/update-profile`,
            {
                first_name: firstName,
                last_name: lastName,
                bio: bio
            })).data;
        
        if (data.updated === true) {
            navigate(`/profile/${data.user._id}`);
        }
    }

    return (
        <div style={styleClasses.cover_div}>
            <div style={styleClasses.update_div}>
                <h2>First Name</h2>
                <input type="text"
                    placeholder="Enter your First Name"
                    name="firstname" value={firstName}
                    onChange={(event) => { setFirstName(event.target.value); }}
                ></input>
                <br></br>
                <h2>Last Name</h2>
                <input type="text"
                    placeholder="Enter your Last Name"
                    name="lastname" value={lastName}
                    onChange={(event) => { setLastName(event.target.value); }}
                ></input>
                <br></br>
                {/* <input type="file" name="profilepicture"></input> */}
                <h2>Bio</h2>
                <textarea placeholder="Enter your bio"
                    name="bio" value={bio}
                    onChange={(event) => { setBio(event.target.value); }}
                    style={{ width: "20em", height: "20em", resize: "none" }}
                ></textarea>
                <br />
                <button onClick={submit}>Update</button>
            </div>
        </div>);
}


export default EditProfile;