import React , {useEffect}  from "react";


const EditProfile= () => {



    return(
        <div>
            <h2>First Name</h2>
            <input type="text" placeholder="Enter your First Name" name="firstname"></input>
            <br></br>
            <h2>Last Name</h2>
            <input type="text" placeholder="Enter your Last Name" name="lastname"></input>
            <br></br>
            {/* <input type="file" name="profilepicture"></input> */}
            <h2>Bio</h2>
            <textarea placeholder="Enter your bio" name="bio"></textarea>
        </div>

    )
}


export default EditProfile;