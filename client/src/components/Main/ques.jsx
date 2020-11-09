import React from "react";

function Question(){

return (
<form method = "post" action = "/Question/postQuestion">
    <textarea name = "Ques" placeholder = "Ask Your Question">   
    </textarea>
    <select name = "category">
    <option value="yoga">Yoga</option>
    <option value="bodyBuilding">BodyBuilding</option>
    </select>
    <select name = "tags">
    <option value="lean">Lean</option>
    <option value="gain">Gain</option>
    </select>

    <button type = "submit">Post</button>

</form>
)
}

export default Question;