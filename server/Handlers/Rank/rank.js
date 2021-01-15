const { Ques, Ans, User, Tag } = require("../../Models");
const hasUserOwnProperty = require("../Question/utilis").hasUserOwnProperty

module.exports.getRankByCategory = async function(req, res, next) {

    const category = req.query.category;
    try {
        const users = await User.find({}, "username score profile_image").exec()
        let result = [];

        users.forEach((user) => {
            let index = hasUserOwnProperty(user, category)
            if (index !== -1) {
                result.push({ _id: user._id, username: user.username, score: user.score[index].score, profile_image: user.profile_image });
            }
        })
        result.sort((x, y) => x.score > y.score);

        res.success = true;
        res.data.ranking = result;
    } catch (err) {

        res.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
    }

}