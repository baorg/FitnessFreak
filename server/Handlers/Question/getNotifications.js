const { Ques, Ans, User, Tag } = require("../../Models");
module.exports.getNotifications = function(req, res){

    const promise = User.find({}, "notifications").exec();
    promise
    .then((notifications) => res.send(notifications))
    .catch((err) => res.send({err : err}))
}