const { Ques, Ans, User, Tag } = require("../../Models");

module.exports = {
    getTags
};


async function getTags(req, res, next) {
    let { q = null } = req.query;
    let success, tags = [];
    console.log('OK');
    try {
        let searchRegEx = new RegExp(`.*${q}.*`, 'i');
        console.log('Searching RegExp: ', searchRegEx);
        tags = await Tag.find({
            tagname: searchRegEx
        }, "tagname").limit(20).exec();
        success = true;
    } catch (err) {
        console.error('ERROR: ', err);
        success = false;
    } finally {
        res.data = {
            success,
            tags
        };
    }
    return next();
}