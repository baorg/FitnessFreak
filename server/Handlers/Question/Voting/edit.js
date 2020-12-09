const { Ques } = require("../../../Models");
const { Ans, Comment } = require("../../../Models");
const { addScore } = require("../utilis");
const {score} = require("../../../config/score");
const User = require("../../../Models/User");


function getModel(flag){
    if(flag == 2)
    return Comment;
    return (flag) ? Ques : Ans;
}

function getIndex(arr, userId){
    return (arr.findIndex((element) => element.userId === userId));
}

function isUpvoted(arr, index){
    return arr[index].value == 1;
}

function isNotUndefined(down){
    return down !== undefined;
}

function setData(arr,index, obj, typeOfValue){

    if (isNotUndefined(typeOfValue)) {
        // obj.value = -obj.value
        arr.set(index, obj);
    } else
        arr.splice(index, 1);

}
function setVoteCount(ques,typeOfVote, typeOfValue){
    // Decrease the voteCount whether its up or down initially
    ques.vote_count[typeOfVote]--;
    if(isNotUndefined(typeOfValue)){
        const oppositeVote = typeOfVote === "upvote" ? "downvote" : "upvote";
        ques.vote_count[oppositeVote]++;
    }

}
module.exports = async function(req, res) {
    let data = "Your respnose has been submitted succesully"
    try
    {
    const userId = req.user.id;
    const quesId = req.body.quesId;
    const up = req.body.up;
    const down = req.body.down;
    const isQues = req.body.isQues;
    const model = getModel(isQues);
    const ques= await model.findById(quesId, 'upDown vote_count').exec();

    
    let arr = ques.upDown 
    let index = getIndex(arr, userId);
    let value = (up === undefined) ? -1 : 1;
    let obj = {userId, value}
    //changes
    let whoPostedId = ques.userId;
    const Score = isQues == 2 ? score.upvoteOnComment : score.upvote;
    let sign = value
    // if already in the array
    if (index != -1) {
        
        const typeOfValue =  isUpvoted(arr, index) ? down : up; 
        const typeOfVote = isUpvoted(arr, index) ? "upvote" : "downvote"; 
        setData(arr, index, obj, typeOfValue, -1)
        setVoteCount(ques, typeOfVote, typeOfValue)
        //Adding Score to the database
        sign = isUpvoted(arr, index) ? -1 : 1;
    }
    // if absent in the array
    else{
    arr.push(obj);
    const typeOfVote = (up === undefined) ? "upvote" : "downvote"; 
    ques.vote_count[typeOfVote]++;
    }


    const user = await User.findById(whoPostedId).exec();
    addScore(user, "totalScore", sign*Score)
    ques.save()
        
    }
    catch{
        data = "Error Occured while saving respnose"
    }
    finally{
        return res.send(data)
    }
       
       

}