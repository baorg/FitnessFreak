const { Ques, User, Ans, Comment } = require("../../Models");
const { createNotification } = require('../Notifications/helpers');


function setResult(result, err) {
    result.isAuthenticated = false;
    result.err = err;
}

module.exports.postComment = async(req, res, next) => {

    const userId = req.user.id;
    const answerId = req.body.answerId;
    const comment = req.body.comment;

    // const result = { isAuthenticated: true, err: false }
    const saveComment = new Comment({
        comment: comment,
        userId: userId,
        vote_count: {},
        upDown: [],
        answerId: answerId
    })

    try {
        const CommentSave = await saveComment.save()
        const AnsUpdate = await Ans.updateOne({ _id: answerId }, { $push: { comments: saveComment } }).exec();

        let ans_user = await Ans.getOne({ _id: answerId }, 'userId').exec().userId;
        await createNotification(ans_user, userId, answerId);

        res.data.success = true;
        res.data.is_saved = true;
        res.data.comment = {
            _id: CommentSave._id,
            answer: CommentSave.comment,
            vote_count: CommentSave.vote_count,
            upDown: CommentSave.upDown,
            user: {
                _id: req.user._id,
                username: req.user.username,
                first_name: req.user.first_name,
                last_name: req.user.last_name
            }
        }
    } catch (err) {
        res.data.success = false;
        res.data.error = 'Some internal error.';
        res.data.is_saved = false;
    } finally {
        return next();
    }

    // Comment.save((err) => {

    //     if(err)
    //     {
    //         console.log("err in saving comment ", err);
    //         setResult(result, err);
    //         return res.send(result)
    //     }

    //     const promise = Ans.updateOne({ _id: answerId }, { $push: { comments: comment } }).exec();
    //     promise.then(() => res.send(result))
    //     .catch((err) => {
    //         setResult(result, err);
    //         return res.send(result);
    //     }) 

    // })


}