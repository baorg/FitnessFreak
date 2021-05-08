const { Ques, Ans, User, Tag } = require("../../Models");
const { AnswerSerializers } = require('../../Serializers');


async function getAnswersByQuesId(req, res, next) {
    let data = [];
    let err = false;

    console.log('Trying to get answers.......');

    try {
        const { quesId } = req.query;

        const obj = {
            path: 'userId',
            model: User,
            options: {
                select: 'username first_name last_name profile_image is_verified'
            },
        }
        const answers = await Ans.find({ quesId: quesId }).populate(obj).exec();
        answers.sort((x, y) => {
            if (x.marked == y.marked) {
                return y.vote_count.downvote - x.vote_count.upvote;
            } else {
                if (x.marked)
                    return -1;
                return 1;
            }
        });

        res.data.success = true;
        res.data.answers = AnswerSerializers.answerSerializer(answers, user = req.user, queestion = false, many = true);
    } catch (err) {
        console.error("ERROR:", err);
        res.data.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
    }
}

async function getAnswerById(req, res, next) {
    try {
        const { ansId } = req.query;
        let obj = [{
            path: 'quesId',
            model: Ques,
            select: 'title question created_at vote_count tags categoryName attachments answers_count',
            populate: {
                path: 'userId',
                model: User,
                select: 'username first_name last_name profile_image'
            }
        }, {
            path: 'userId',
            model: User,
            select: 'username first_name last_name profile_image'
        }];

        let answer = await Ans.findOne({ _id: ansId }, 'vote_count answer quesId userId marked upDown').populate(obj).exec();

        if (answer) {
            res.data.success = true;
            res.data.answer = AnswerSerializers.answerSerializer(answer);
        } else {
            res.data.success = true;
            res.data.answer = null;
        }
    } catch (err) {
        console.error("ERROR:", err);
        res.data.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
    }
}


module.exports = {
    getAnswersByQuesId,
    getAnswerById
}