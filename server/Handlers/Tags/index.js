const { Ques, Ans, User, Tag } = require("../../Models");

module.exports = {
    getTags
};


async function getTags(req, res, next) {
    let { q = "" } = req.query;
    let success, tags = [];
    console.log('OK');
    try {
        if (q.length === 0)
            tags = [];
        else {
            let searchRegEx = new RegExp(`.*${q}.*`, 'i');
            tags = await Tag.find({
                tagname: searchRegEx
            }, "tagname").limit(20).exec();
        }
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