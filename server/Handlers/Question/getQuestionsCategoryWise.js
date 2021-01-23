const { Ques, Ans, User, Tag } = require("../../Models");
const { getArrayOfQues } = require("./utilis");

async function getQuestions(obj, page, count, name) {
    console.log('Categories: ', name);
    const questions = await Ques.find({ categoryName: { $in: name } },
            "title question categoryName vote_count attachments created_at userId", {
                limit: count,
                skip: (page - 1) * count
            })
        .populate(obj).exec()
    return getArrayOfQues(questions);
}

module.exports.getQuestionsCategoryWise = async function(req, res, next) {

    let data = [];
    let success;
    try {
        let categories = req.params.name.split(',');

        let { page = 1 } = req.query;
        const obj = {
            path: 'userId',
            model: User,
            options: {
                select: 'username first_name last_name profile_image'
            },
        }

        const page_size = 20;

        res.data.success = true;
        res.data.questions = await getQuestions(obj, page, 20, categories);

    } catch (err) {
        console.log("err in getting questions by category ->", err)
        res.data.success = false;
    } finally {
        return next();
    }

}