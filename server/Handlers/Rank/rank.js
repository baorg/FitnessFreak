const { Ques, Ans, User, Tag } = require("../../Models");

module.exports.getRankByCategory = async function(req, res) {

    const category = req.params.name;
    const obj = {isAuthenticated : true,
                    data : ""}
    try{
    const promise =  await User.find({}, "username score").exec()
    const getScore =  await promise.then((users) => {

                       const result =  users.map((user) => {
                            if(user.score.hasOwnProperty(category))
                            {
                                return {_id : user._id, username : user.username, score : user.score[category]};
                            }
                        })

                        result.sort((x, y) => x.score > y.score);
                        obj.data = result;
                    })
    }
    catch(err){
         console.log("err in getting Rank By category ", err);
        obj.data = err;
        obj.isAuthenticated = false;
    }
    finally{
        return res.send(obj);
    }

}

