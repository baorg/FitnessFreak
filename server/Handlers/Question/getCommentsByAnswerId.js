const { getArrayOfAns } = require("./utilis")


module.exports.getCommentsByAnswerId = async(req, res, next) => {

    const { Ques, Ans, User, Tag, Comment } = require("../../Models");
    let data = []
    let err = false;
    try {
        // const userId = req.user.id;
        const { answerId } = req.query;
        const obj = {
            path: 'userId',
            model: User,
            options: {
                select: 'username first_name last_name'
            },
        }

        comments = await Comment.find({ answerId: answerId }, "upDown comment answerId userId vote_count").populate(obj).exec();
        // console.log(`COmments = ${comments}`)
        res.data.success = true;
        res.data.comments = getArrayOfAns(comments, "comment");
    } catch (err) {
        console.error("ERROR:", err);
        res.data.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
    }
}