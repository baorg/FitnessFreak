const { category, categories } = require("../../config");

module.exports.getCategory = function(req, res, next) {
    // console.log("in get category",category);
    res.data.categories = category;
    res.data.categories_data = categories;
    res.data.success = true;
    return next();
}