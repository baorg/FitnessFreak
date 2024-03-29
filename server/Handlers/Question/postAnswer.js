const CLIENT_HOME_PAGE_URL = process.env.CLIENT_DOMAIN;
const CLIENT_LOGIN_PAGE_URL = `${CLIENT_HOME_PAGE_URL}/auth`;
const { Ques, Ans, User } = require("../../Models");
const { addAnswer } = require('Repository/answer');

module.exports = async function(req, res, next) {
    console.log('Posting answer....');

    const userId = req.user.id;
    const quesId = req.body.quesId;
    const answer = req.body.answer;
    const name = "answer";

    try {
        let ans = new Ans({
            answer: answer,
            upDown: [],
            vote_count: {},
            comments: [],
            userId: userId,
            quesId: quesId
        });

        await addAnswer(ans);

        res.data.success = true;
        res.data.is_saved = true;
        res.data.answer = {
            _id: ans._id,
            answer: ans.answer,
            marked: ans.marked,
            upDown: ans.upDown,
            vote_count: ans.vote_count,
            user: {
                _id: req.user._id,
                username: req.user.username,
                first_name: req.user.first_name,
                last_name: req.user.last_name
            }
        };
    } catch (err) {
        console.error('ERROR: ', err);
        res.data.success = false;
        res.data.is_saved = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
    }
}