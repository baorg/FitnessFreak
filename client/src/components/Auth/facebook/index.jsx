import React, { useState } from 'react';
import logo from './facebook-login-btn.png';
import CONFIG from '../../../config';

const facebookStyle = {
    facebook_btn: {
        width: "370px",
        margin: '10px 0 0 10px',
        cursor: 'pointer',
        borderRadius: "6px"
    },
    facebook_btn_mouseover: {
        boxShadow: "0px 0px 3px 5px rgb(81, 165, 243)",
    }
};

export default function FacbooAuth(props) {
    const [style, setStyle] = useState(facebookStyle.facebook_btn);

    function handleMouseOver() {
        setStyle({ ...facebookStyle.facebook_btn, ...facebookStyle.facebook_btn_mouseover });
    }

    function handleMouseOut() {
        setStyle(facebookStyle.facebook_btn);
    }


    return (<div>
        <a href={`${CONFIG.API_DOMAIN}/auth/facebook`}>
            <img
                className="facebook-img-btn"
                src={logo}
                style={style}
                alt="facebook login button"
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            />
        </a>
    </div>);
}