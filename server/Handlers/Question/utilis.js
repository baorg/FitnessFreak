const { Ques, Ans, User, Tag } = require("../../Models");
const score = require("../../config").score;

function getArrayOfQues(arr) {
    return arr.map((ques) => ({
        _id: ques._id,
        title: ques.title,
        question: ques.question,
        category: ques.categoryName,
        user: ques.userId,
        posted_at: ques.created_at,
        attachments : ques.attachments,
        vote_count: ques.vote_count,
    }));
}

function hasUserOwnProperty(user, property) {
    return user.score.findIndex((ele) => ele.name == property)
}

function addScore(user, property, Score) {

    let index = hasUserOwnProperty(user, property);
    if (index == -1) {
        user.score.push({ name: property, score: Score })
    } else {
        newScore = user.score[index].score + Score;
        user.score.set(index, { name: property, score: newScore })
    }
}
async function makeChanges(quesId, userId, sign, name, property){
    const { Ques, Ans, User, Tag } = require("../../Models");
    try{
        const ques = await model.findById(quesId, "userId").exec();
        const user = await User.findById(String(ques.userId), "score notifications").exec()
        addScore(user, "totalScore", (sign) * score[name]);
        const username = await User.findUserByUserId(userId)
        console.log("username in utilis = ", username)
        sign > 0 ? user.notifications.push(`<p><A href = "/profile/${userId}">${username}</A> has ${name}ed your ${property}</p>`) : null
        await user.save();
        return user;
    }
    catch(err){
        return err;
    }


}

async function isSameUser(quesId, userId){
    const { Ques, Ans, User, Tag } = require("../../Models");
    let data = false;
    
    try{
        const ques = await Ques.findById(quesId, "userId").exec();
        if (String(ques.userId) == userId)
                data = true;
    }
    catch(err){
        data = err;
    }
    finally{
        return data;
    }


}


async function saveChanges(quesId, userId, sign, name, property = "Question") {
    //Checking whether the user is bookmarking his own question or not
    try{
    const isSame = await isSameUser(quesId, userId, sign, name);
    console.log(`is Same output ${isSame}`)
    if(!isSame)
        await makeChanges(quesId,userId, sign, name, property, model);

    return isSame;
    }
    catch(err){
        return err;
    }
}


function getArrayOfAns(answers, name) {


    return answers.map((ans) => ({

        _id: ans._id,
        answer: ans[name],
        user: ans.userId,
        vote_count: ans.vote_count,
        upDown: ans.upDown
    }))
}

module.exports = { getArrayOfQues, isSameUser, saveChanges, addScore, hasUserOwnProperty, getArrayOfAns }