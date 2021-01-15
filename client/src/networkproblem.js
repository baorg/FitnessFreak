import React from 'react';
import ReactDOM from 'react-dom';
import NetworkProblem from './network_error';


export default function networkError() {
    const errorEl = document.getElementById("error-main");
    ReactDOM.render(errorEl, < NetworkProblem / > );
}