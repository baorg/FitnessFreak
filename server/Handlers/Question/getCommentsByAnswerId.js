const { getArrayOfAns } = require("./utilis")


module.exports.getCommentsByAnswerId = async(req, res) => {

    const { Ques, Ans, User, Tag, Comment } = require("../../Models");
    let data = []
    let err = false;
    try {
        // const userId = req.user.id;
        const answerId = req.body.answerId;
        const obj = {
            path: 'userId',
            model: User,
            options: {
                select: 'username first_name last_name'
            },
        }

        comments = await Comment.find({ answerId: answerId }, "upDown comment answerId userId vote_count").populate(obj).exec()
        console.log(`COmments = ${comments}`)
        data = getArrayOfAns(comments, "comment");

    } catch (err) {
        console.log("err in getting comments");
        err = true;
    } finally {
        return res.send({ data, err });
    }

}