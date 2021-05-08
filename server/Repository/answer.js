const { Ques, Ans, User } = require("Models");
const saveChanges = require("Handlers/Question/utilis").saveChanges;
const { createNotification } = require('Handlers/Notifications/helpers');

async function addAnswer(answer) {
    const name = "answer";
    answer = await answer.save();

    let user = await User.findById(answer.userId).exec();
    let user_answers = await Ans.find({ userId: user._id }, 'id');
    user.answer = user_answers.map(ans => ans._id.toString());
    user = await user.save();

    let question = await Ques.findById(answer.quesId).exec();
    let ques_answers = await Ans.find({ quesId: question._id }, 'id');
    question.answer = ques_answers.map(ans => ans._id.toString());
    question.answers_count = ques_answers.length;
    await question.save();

    await saveChanges(answer.quesId, answer.userId, 1, name);
    await createNotification(question.userId, answer.userId, 2, answer._id);
}

async function deleteAnswer(answerId, userId) {
    let answer = await Ans.findById(answerId);
    let question = await Ques.findById(answer.quesId);
    let user = await User.findById(userId);

    if (answer.userId.toString() === userId) {
        await answer.delete();

        let user_answers = await Ans.find({ userId: user._id }, 'id');
        user.answer = user_answers.map(ans => ans._id.toString());
        user.save();

        let ques_answers = await Ans.find({ quesId: question._id }, 'id');
        question.answer = ques_answers.map(ans => ans._id.toString());
        question.answers_count = ques_answers.length;
        await question.save();
        return true;
    }

    return false;
}

module.exports = {
    addAnswer,
    deleteAnswer
}