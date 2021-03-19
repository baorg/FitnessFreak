const { Ques, Ans, User, Tag } = require("../../Models");

async function getUnansweredCount(req, res, next) {
    try {
        let question_count = await Ques.find({answers: {$size: 0}}).count().exec();
        res.data.success = true;
        res.data.unanswered_question_count = question_count;
    } catch (err) {
        console.error("ERROR:", err);
        res.data.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
    }
}


module.exports = {
    getUnansweredCount
}