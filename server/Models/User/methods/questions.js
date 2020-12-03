const mongoose = require('mongoose');

async function getAllQuestionsOfFollowings(start_timestamp, end_timestamp, select = 'id', populate = []) {
    const { User, Ques } = require('./../../../Models');

    if (start_timestamp == null)
        start_timestamp = new Date(0);
    if (end_timestamp == null)
        end_timestamp = new Date();

    questions_list = [];

    let followings_list = (await User.findOne({ _id: this._id }).select('following').exec())['following'];
    let questions_promise = await followings_list.map(user => Ques.getQuestionsOfUser(user, start_timestamp, end_timestamp, select, populate));
    let questions = await Promise.all(questions_promise);


    questions.forEach(ques => {
        questions_list.concat(ques);
    });

    return questions_list;
}

module.exports = {
    getAllQuestionsOfFollowings,
}