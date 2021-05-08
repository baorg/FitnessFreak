const { Ques, Ans, User, Tag, Comment } = require("../../Models");
const AnswerRepo = require('Repository/answer');
const QuestionRepo = require('Repository/question');

async function deleteQuestion(req, res) {
    let err = false;
    const quesId = req.body.quesId;
    const userId = req.user.id;
    try {
        err = !await QuestionRepo.deleteQuestion(quesId, userId);
    } catch (error) {
        err = true;
        console.log("err while deleting question ", error);
    } finally {
        return res.send({ err: err })
    }

}
async function deleteAnswer(req, res) {
    let err = false;
    const ansId = req.body.ansId;
    const userId = req.user.id;
    try {
        let d = await AnswerRepo.deleteAnswer(ansId, userId);
        if (!d) {
            err = true;
        }
    } catch (error) {
        err = true;
        console.log("err while deleting answer ", error);
    } finally {
        return res.send({ err: err })
    }

}

async function deleteComment(req, res, next) {
    const commentId = req.body.commentId;

    try {
        await Comment.findByIdAndDelete(commentId).exec();
        res.data.error = false;
        res.data.deleted = true;
    } catch (error) {
        res.data.deleted = false;
        res.data.error = 'Some internal error.';
        console.log("err while deleting Comment ", error);
    } finally {
        return next();
    }

}


module.exports = { deleteQuestion, deleteAnswer, deleteComment }