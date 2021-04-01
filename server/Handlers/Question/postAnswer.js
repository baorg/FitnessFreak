const CLIENT_HOME_PAGE_URL = process.env.CLIENT_DOMAIN;
const CLIENT_LOGIN_PAGE_URL = `${CLIENT_HOME_PAGE_URL}/auth`;
const { Ques, Ans, User } = require("../../Models");
const saveChanges = require("./utilis").saveChanges;
const { createNotification } = require('../Notifications/helpers');

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
        ans = await ans.save();
        let user = await User.findById(userId).exec();
        user.answer.push(ans._id);
        user = await user.save();

        let ques = await Ques.findById(quesId).exec();
        ques.answers.push(ans._id);
        ques.answers_count = ques.answers.length;
        ques = await ques.save();

        await saveChanges(quesId, userId, 1, name);
        await createNotification(ques.userId, userId, 2, ans._id);


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