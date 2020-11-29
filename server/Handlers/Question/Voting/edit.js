const { Ques } = require("../../../Models");
const { Ans } = require("../../../Models");


function getModel(flag){
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
        obj.value = -obj.value
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
module.exports = function(req, res) {
    const userId = req.user.id;
    const quesId = req.body.quesId;
    const up = req.body.up;
    const down = req.body.down;
    const isQues = req.body.isQues;

    const model = getModel(isQues);
    const query = model.findById(quesId, 'upDown');
    const promise = query.exec();


    promise.then((ques) => {
            let arr = ques.upDown 
            let index = getIndex(arr, userId);
            let value = (up === undefined) ? -1 : 1;
            let obj = {userId, value}

            // if already in the array
            if (index != -1) {

                const typeOfValue =  isUpvoted(arr, index) ? down : up; 
                const typeOfVote = isUpvoted(arr, index) ? "upvote" : "downvote"; 
                setData(arr, index, obj, typeOfValue)
                setVoteCount(ques, typeOfVote, typeOfValue)
                
            }
            // if absent in the array
             else 
                arr.push(obj)

        
            ques.save((err) => {
                if (err) return res.send("Error in recording response");
                return res.send("Your respnose has been submitted succesully");
            })


        })
        .catch((err) => {
            return res.send({ err: err });
        })


}