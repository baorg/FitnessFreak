const { Ques, User } = require("../../Models");
const { validationResult } = require('express-validator');
const score = require("../../config").score;
const addScore = require("./utilis").addScore;

module.exports = async function(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.data.succes = false;
        res.data.errors = errors.array();
        res.data.error = 'Validation error.';
        return next();
    }

    try {
        let user_id = req.user.id;
        let category = req.body.category;
        let tags = req.body.tags;
        let question = req.body.question;
        let title = req.body.title;
        let attachments = req.body.attachments || [];

        const ques = new Ques({
            title: title,
            question: question,
            userId: user_id,
            vote_count: {},
            upDown: [],
            answers: [],
            categoryName: category,
            tags: tags,
            created_at: new Date(Date.now()),
        });
        attachments.forEach(val => {
            ques.attachments.push({
                url: val.url,
                type_: 'image'
            });
        })


        await ques.save();
        await User.updateOne({ _id: user_id }, { $push: { question: ques._id } }).exec();

        let user = await User.findById(user_id, "score").exec()
        addScore(user, "totalScore", score.question);
        category.forEach((ele) => {
            addScore(user, ele, score.question)
        })
        await user.save()

        res.data.is_saved = true;
        res.data.success = true;
    } catch (err) {
        console.error('[ERROR] ', __filename, err);
        res.data.is_saved = false;
        res.data.succes = false;
        res.data.error = "some error occured";
    } finally {
        return next();
    }
}