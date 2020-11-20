const { User } = require('../../Models');
const { commentSchema } = require('../../Models/Comment');

module.exports = function(req, res, next) {
    const userName = req.body.username;
    console.log('body:', req.body);
    User.find({userName:userName}).exec(
        (err,user) => {
            if(err) return res.send({err:err});
            else{
                console.log(user);
                console.log(user.id);
                console.log(user[0]._id);
                return res.send({userid:user[0]._id});
            }
        }
    )
}