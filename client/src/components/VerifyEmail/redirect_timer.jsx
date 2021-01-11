import React, { useState, useEffect } from 'react';


export default function RedirectTimer({ ttl, redirectURL }) {
    let [time, setTime] = useState(ttl);

    useEffect(() => {
        if (time > 0) {
            setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else {
            window.location.href = redirectURL;
        }
    }, [time]);

    return (
        <div>
            <p>Redirecting in {time}s</p>
        </div>
    )
}