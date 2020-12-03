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
async function isSameUser(quesId, userId, sign, name){

    const promise = Ques.findById(quesId, "userId").exec();
    return response = promise.then((ques) => {
        if(ques.userId != userId)
            {
                User.findById(ques.userId, "score notifications").exec((err, user) => {
                    console.log("score[name] ", score[name]);
                    user.score.totalScore += (sign)*score[name];
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

module.exports = { getArrayOfQues, isSameUser, saveChanges }