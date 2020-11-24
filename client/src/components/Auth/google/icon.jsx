import React, {useState} from 'react';
import GoogleDisabledIcon from  './google_signin_buttons/web/2x/btn_google_signin_dark_disabled_web@2x.png'
import GoogleFocusIcon from './google_signin_buttons/web/2x/btn_google_signin_dark_focus_web@2x.png'
import GoogleNormalIcon from './google_signin_buttons/web/2x/btn_google_signin_dark_normal_web@2x.png'
import GooglePressedIcon from './google_signin_buttons/web/2x/btn_google_signin_dark_pressed_web@2x.png'

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
            <a href="/auth/google">
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