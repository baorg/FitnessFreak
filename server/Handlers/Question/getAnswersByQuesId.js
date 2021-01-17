const { Ques, Ans, User, Tag } = require("../../Models");
const { getArrayOfAns } = require("./utilis");

module.exports.getAnswersByQuesId = async(req, res, next) => {

    let data = []
    let err = false;
    try {
        // const userId = req.user.id;
        const { quesId } = req.query;

        const obj = {
            path: 'userId',
            model: User,
            options: {
                select: 'username first_name last_name'
            },
        }

        const answers = await Ans.find({ quesId: quesId }).populate(obj).exec();
        answers.sort((x, y) => {
            // console.log(`${x} and ${y}`);
            if (x.marked == y.marked) {
                console.log(`votecount = ${x.vote_count.upvote} and ${y.vote_count.upvote}`)
                const xcount = x.vote_count.upvote
                const ycount = y.vote_count.upvote

                if (xcount > ycount) return -1;
                if (xcount == ycount) return 0;
                return 1;
            } else {
                if (x.marked)
                    return -1;
                return 1;
            }
        });
        // console.log("answers=", answers);
        res.data.success = true;
        res.data.answers = getArrayOfAns(answers, "answer");;
    } catch (err) {
        console.error("ERROR:", err);
        res.data.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
    }
}