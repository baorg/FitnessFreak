
const category = require("../../config").category

module.exports.getCategory = function(req, res){
    return res.send(category)
}