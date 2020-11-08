import React from 'react';
import './style.css';
import { A } from 'hookrouter';

function HTML404() {
    return (
        <div className="error-page">
            <h1 className="error-heading">404 Error</h1>
            <p className="error-body">Page not found</p>
            <A href='/'>Redirect to main page</A>
        </div>
    );
}

export { HTML404 };