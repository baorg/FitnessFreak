const { Ques, Ans, User, Tag } = require("../../Models");
const score = require("../../config").score;
function getArrayOfQues(arr) {
    return arr.map((ques) => ({
        _id: ques._id,
        title: ques.title,
        question: ques.question,
        category: ques.categoryName,
        user: ques.userId,
        created_at: ques.created_at
    }));
}

function hasUserOwnProperty(user, property){
    return user.score.findIndex((ele) => ele.name == property)
}

function addScore(user, property, Score){

    let index  = hasUserOwnProperty(user, property);
    if(index == -1){
        user.score.push({name : property, score : Score})
    }
    else{
        newScore = user.score[index].score + Score;
        user.score.set(index, {name : property, score : newScore})
    }
}
async function isSameUser(quesId, userId, sign, name){

    const promise = Ques.findById(quesId, "userId").exec();
    return response = promise.then((ques) => {
        if(ques.userId != userId)
            {
                User.findById(ques.userId, "score notifications").exec((err, user) => {
                    console.log("score[name] ", score[name]);
                    // user.score.totalScore += (sign)*score[name];
                    addScore(user, "totalScore", (sign)*score[name]);
                    user.notifications.push(`Someone has ${name}ed your question`)
                    user.save((err) => {
                        if(err)
                        return err;
                    })
                })
            }
            return user;
    })
    .catch((err) => (err));


}

async function saveChanges(quesId, userId, sign, name){
    //Checking whether the user is bookmarking his own question or not
    const promise = await isSameUser(quesId, userId,sign, name);
   return promise;
}

module.exports = { getArrayOfQues, isSameUser, saveChanges, addScore, hasUserOwnProperty}