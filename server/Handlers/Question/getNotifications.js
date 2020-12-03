const { Ques, Ans, User, Tag } = require("../../Models");
module.exports.getNotifications = function(req, res){

    const promise = User.findById(req.user.id, "notifications").exec();
    promise
    .then((notifications) => {
        console.log(notifications);
       return res.send(notifications)
    })
    .catch((err) => res.send({err : err}))
}