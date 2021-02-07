const express = require("express");
const { User } = require("../../Models");

function searchUserHandler(req, res, next) {
    let filter = req.body.username;
    let regexp = new RegExp("^" + filter);
    return User.find({ username: { $regex: regexp } }).select('username profile_image first_name last_name').exec().then(users => {
        // console.log('filter:', filter);
        // console.log('Users:', users);
        res.data.success = true;
        res.data.users = users;
    }).catch(err => {
        console.log('ERROR:', err);
        res.data.success = false;
        res.data.users = [];
        res.data.error = 'Some internal error.';
    }).finally(() => {
        return next();
    });
    // User.find({username: {$in: }}).exec((err, users) => {
    //     if (err) return res.send(err);
    //     else {
    //         let filter = req.body.username;
    //         // console.log("body is" + req.body)
    //         // console.log("hi the filter is" + filter);
    //         if (filter === " ")
    //             res.send({ newArr: [] });
    //         else {
    //             // console.log(users);
    //             let newArr = [];
    //             users.forEach(el => {
    //                 if (el.userName !== undefined) {
    //                     if (el.userName.includes(filter))
    //                         newArr.push(el.userName);
    //                 }
    //             })
    //             // console.log(newArr);
    //             res.send({ newArr: newArr });
    //         }
    //     }
    // });
}

async function getSuggestions(req, res, next){
    try{
        // if user logged in
        let user_followings = new Set();

        if(req.user){
            (await User.findOne({_id: req.user._id}, 'following').exec())
                .following.map(u=>user_followings.add(u.toString()));
            // console.log(user_followings);
            user_followings.add(req.user.id);
        }


        let users = await User.find({}, 'id username first_name last_name profile_image score').exec();

        users = users.filter(user=>!user_followings.has(user.id));

        users.sort((a, b)=>{
            let a_score = a.score.find(t=>t.name==='totalScore');
            let b_score = b.score.find(t=>t.name==='totalScore');
            return (b_score ? b_score.score : 0) - (a_score ? a_score.score : 0);
        });

        res.data.success = true;
        res.data.suggestions = users.slice(0, 10);
    }catch(err){
        console.log('ERROR:', err);
        res.data.success = false;
        res.data.error = 'Some internal error.'
    }finally{
        return next();
    }
}

module.exports = {
    searchUserHandler,
    getSuggestions
};