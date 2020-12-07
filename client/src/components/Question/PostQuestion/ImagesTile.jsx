import React, {useEffect, useState} from 'react';
import { AddToPhotosRounded, RemoveCircle } from '@material-ui/icons';
import { Spinner } from 'react-bootstrap'

import UploadImage from './UploadImage';
    
export default function ImagesTile(props) {
    const [addAllowed, setAddAllowed] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [requestUpload, setRequestUpload] = useState(false);

    const maxAllowed = 5;

    useEffect(async () => {
        if (props.images.length >= maxAllowed)
            setAddAllowed(false);
        else
            setAddAllowed(true);
    }, [props.images])

    async function handleRemovePhoto(event, id) {
        props.setImages(props.images.filter((img, i) => i != id));
    }

    async function handleAddNewPic(event) {
        console.log('Adding new picture.....');
        setUploading(true);
        setRequestUpload(true);
        // setTimeout(() => {
        //     props.setImages(props.images.concat(['https://picsum.photos/200']));
        //     setUploading(false);
        // }, 10000);
    }

    function AddButton() {
        switch (true) {
            case requestUpload:
                return <UploadImage />
            case uploading:
                return <Spinner />;
            case addAllowed:
                return <AddToPhotosRounded color="primary" className="add-img" style={{ fontSize: "4em" }} onClick={handleAddNewPic} > <input type="file" /> </AddToPhotosRounded>
            default:
                return <></>;
        }
    }


    return (
        <div className="images-container">
            { props.images.map((image, index) =>
                <div className="img-box">
                    <img src={image} className="img" id={index} />
                    <RemoveCircle className="remove-img-btn" onClick={(event) => { handleRemovePhoto(event, index) }} />
                </div>)}
            <AddButton />
        </div>
    );
}