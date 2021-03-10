const { Ques, Ans, User, Tag } = require("../../Models");
const hasUserOwnProperty = require("../Question/utilis").hasUserOwnProperty
const { score } = require('../../config');

module.exports.getRankByCategory = async function(req, res, next) {
    const type = req.body.type;
    const categories = req.body.categories;
    try {
        const users = await User.find({}, "username first_name last_name score profile_image chosen_category").exec();
        let result = [];

        if (type === 'followers'){
            users.forEach((user)=>{
                let index = hasUserOwnProperty(user, type);
                let totalScoreIndex = hasUserOwnProperty(user, 'totalScore');

                if (    index !== -1 &&
                        (categories.length===0 || categories.some(c=>user.chosen_category&&user.chosen_category.some(cc=>cc===c)))
                    ) {
                    result.push({
                        _id: user._id,
                        username: user.username,
                        score: user.score,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        catScore: user.score[index].score,
                        profile_image: user.profile_image,
                        totalScore: user.score[totalScoreIndex].score,
                        followers: Math.floor(user.score[index].score/score.followerGained)
                    });
                }
            })
        } else if (type === 'totalScore') {
            console.log(type);
            users.forEach((user) => {
                let index = hasUserOwnProperty(user, type);
                let totalScoreIndex = hasUserOwnProperty(user, 'totalScore');

                if (index !== -1) {
                    result.push({
                        _id: user._id,
                        username: user.username,
                        score: user.score,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        catScore: user.score[index].score,
                        profile_image: user.profile_image,
                        totalScore: user.score[totalScoreIndex].score,
                        followers: Math.floor(user.score[index].score/score.followerGained)
                    });
                }
            });
            console.log(result.length);
        } else if (type === 'category') {
            let categoriesSet = new Set(categories);
            // console.log(type, categories, users[0].score);

            users.forEach((user) => {
                let totalScoreIndex = hasUserOwnProperty(user, 'totalScore');
                let tmpData = {
                    _id: user._id,
                    username: user.username,
                    score: user.score,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    profile_image: user.profile_image,
                    totalScore: totalScoreIndex === -1 ? 0 : user.score[totalScoreIndex].score,
                    catScore: 0
                };
                user.score.forEach(({ name, score }) => {
                    if (categoriesSet.has(name))
                        tmpData.catScore += score;
                });                

                if (tmpData.catScore > 0) {
                    result.push(tmpData);
                }
            });
        }

        result.sort((a, b) => b.catScore - a.catScore);

        res.success = true;
        res.data.ranking = result;
    } catch (err) {
        console.error('ERROR:', err);
        res.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
    }

}