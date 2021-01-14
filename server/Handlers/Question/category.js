const category = require("../../config").category

module.exports.getCategory = function(req, res, next) {
    // console.log("in get category",category);
    res.data.categories = category;
    res.data.success = true;
    return next();
}