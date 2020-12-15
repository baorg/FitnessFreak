const category = require("../../config").category

module.exports.getCategory = function(req, res) {
    // console.log("in get category",category);
    return res.send(category)
}