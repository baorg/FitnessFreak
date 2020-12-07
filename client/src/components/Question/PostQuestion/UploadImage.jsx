import React from 'react';
import './Postques.css';


export default function AddImage(props) {
    
    return (
        <div className="upload-img">
            <img src="" className="img" />
            <input type="file" width="20px"/>
            <button>Submit</button>
        </div>
    )
}