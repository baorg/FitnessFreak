const { Ques, Ans, User } = require("Models");
const saveChanges = require("Handlers/Question/utilis").saveChanges;
const { createNotification } = require('Handlers/Notifications/helpers');
const score = require("config").score;
const addScore = require("Handlers/Question/utilis").addScore;

module.exports = {
    addQuestion,
    deleteQuestion
}

async function addQuestion(question) {
    question = await question.save();
    let user = await User.findById(question.userId, "score").exec();
    let user_questions = await Ques.find({ userId: user._id }, 'id');
    user.question = user_questions.map(que => que._id.toString());
    addScore(user, "totalScore", score.question);
    question.categoryName.forEach((ele) => {
        addScore(user, ele, score.question)
    })
    await user.save();

    return question;
}


async function deleteQuestion(quesId, userId) {
    let question = await Ques.findById(quesId);
    // console.log(question);

    if (question.userId.toString() === userId) {
        await Ques.findByIdAndDelete(quesId).exec();
        let user = await User.findById(userId);
        let user_questions = await Ques.find({ userId: user._id }, 'id');
        user.question = user_questions.map(que => que._id.toString());
        user = await user.save();
        return true;
    }

    return false;
}

async function addComment() {

}

async function deleteComment() {

}