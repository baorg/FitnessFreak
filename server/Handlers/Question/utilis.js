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
    
    console.log("Err in QUes in utilis");
    console.log(`ques = ${Ques} and user =  ${User}`)
    const promise = Ques.findById(quesId, "userId").exec();
    console.log("Err in User in utilis");
    return response = promise.then(async(ques) => {
        if(String(ques.userId) != userId)
            {
                console.log("Error in USer")
                await User.findById(String(ques.userId), "score notifications").exec((err, user) => {
                    console.log("score[name] ", score[name]);
                    // user.score.totalScore += (sign)*score[name];
                    addScore(user, "totalScore", (sign)*score[name]);
                    user.notifications.push(`Someone has ${name}ed your question`)
                    user.save((err) => {
                        if(err)
                        return err;
                        
                    })
                })
                return user;
            }
            else
            return user;
    })
    .catch((err) => (err));


}

async function saveChanges(quesId, userId, sign, name){
    //Checking whether the user is bookmarking his own question or not
    const promise = await isSameUser(quesId, userId,sign, name);
   return promise;
}


function getArrayOfAns(answers, name){


    return answers.map((ans) => ({

        _id: ans._id,
        answer: ans[name],
        user: ans.userId,
        vote_count : ans.vote_count,
        upDown : ans.upDown
    })
    )
}

module.exports = { getArrayOfQues, isSameUser, saveChanges, addScore, hasUserOwnProperty, getArrayOfAns}