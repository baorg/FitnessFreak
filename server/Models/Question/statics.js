const questions = require("../User/methods/questions");

async function getQuestionsInBetween(start_timestamp = null, end_timestamp = null, limit = 200, select = 'id', populate = []) {
    if (start_timestamp == null)
        start_timestamp = new Date(0);
    if (end_timestamp == null)
        end_timestamp = new Date();

    let questions = await this
        .find({ created_at: { $gte: after_date, $lte: before_date } })
        .limit(limit)
        .select(select)
        .exec();
    return questions;
}

async function getQuestionsOfUser(user, start_timestamp = null, end_timestamp = null, select = 'id', populate = []) {
    if (start_timestamp == null)
        start_timestamp = new Date(0);
    if (end_timestamp == null)
        end_timestamp = new Date();

    let questions = await this
        .find({ userId: user._id, created_at: { $gte: start_timestamp, $lte: end_timestamp } })
        .select(select)
        .populate(populate)
        .exec();

    return questions;
}


async function getTopQuestions(start_timestamp = null, end_timestamp = null, skip = 0, count = 10, select = 'id', populate = []) {
    if (start_timestamp == null)
        start_timestamp = new Date(0);
    if (end_timestamp == null)
        end_timestamp = new Date(Date.now());

    let questions = await this
        .find({ created_at: { $gte: start_timestamp, $lte: end_timestamp } })
        .sort({ 'vote_count.upvote': -1 })
        .skip(skip)
        .limit(count)
        .select(select)
        .populate(populate)
        .exec()

    return questions
}

module.exports = { getQuestionsInBetween, getQuestionsOfUser, getTopQuestions }