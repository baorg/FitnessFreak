const { Ques, Ans, User, Tag, Comment } = require("../../Models");


async function deleteQuestion(req, res) {
    let err = false;
    const quesId = req.body.quesId;
    const userId = req.user.id;
    try {
        await Ques.findByIdAndDelete(quesId).exec()
        const user = await User.findById(userId)
        user.question.pull(quesId)
        await user.save();
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
        await Ans.findByIdAndDelete(ansId).exec()
        const user = await User.findById(userId)
        user.answer.pull(ansId)
        await user.save();
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