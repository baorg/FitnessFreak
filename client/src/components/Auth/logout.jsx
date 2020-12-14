import react, {useEffect, useState} from 'react';
import ajaxRequest from '../../ajaxRequest';
import CONFIG from '../../config.json';

function LogOut(props) {
    const [loggedout, setLoggedOut] = useState(false);

    useEffect(async () => {
        const res = await ajaxRequest('get', `${CONFIG.API_DOMAIN}/auth/logout`);
        console.log("Res: ", res);
        if (res.data.loggedout)
            setLoggedOut(true);
    },[]);

    return (
        loggedout ?
            <div>
                <h1>You have logged out from the session.</h1>
                <a href={CONFIG.CLIENT_DOMAIN}>Return to home</a>
            </div>
            : <div>
                <p>Logging out .........</p>
            </div>
    );
}

export default LogOut;