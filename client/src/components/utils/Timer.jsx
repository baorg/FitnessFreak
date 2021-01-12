import React, { useState, useEffect } from 'react';


export default function RedirectTimer({ ttl, onTimerEnd }) {
    let [time, setTime] = useState(ttl);

    useEffect(() => {
        if (time > 0) {
            setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else {
            onTimerEnd();
        }
    }, [time]);

    return <div>{time}s</div>;
}