import React from 'react';
import './style.css';

function HTML404() {
    return (
        <div className="error-page">
            <h1 className="error-heading">404 Error</h1>
            <p className="error-body">Page not found</p>
            <a href='/'>Redirect to main page</a>
        </div>
    );
}

export { HTML404 };