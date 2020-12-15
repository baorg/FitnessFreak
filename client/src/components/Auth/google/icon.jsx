import React, {useState} from 'react';
import GoogleFocusIcon from './google_signin_buttons/web/2x/btn_google_signin_dark_focus_web@2x.png'
import GoogleNormalIcon from './google_signin_buttons/web/2x/btn_google_signin_dark_normal_web@2x.png'
import CONFIG from '../../../config';

function GoogleIcon(props) {
    const [googleIcon, setGoogleIcon] = useState(GoogleNormalIcon);

    function handleMouseOver() {
        setGoogleIcon(GoogleFocusIcon);
    }
    function handleMouseOut() {
        setGoogleIcon(GoogleNormalIcon);
    }

    return (
        <div>
            <a href={`${CONFIG.API_DOMAIN}/auth/google`}>
                <img
                    className="google-btn-img"
                    src={googleIcon} 
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                />
            </a>
        </div>
    );
}

export default GoogleIcon;