const express = require("express");
const { User } = require("../../Models");

module.exports = function(req, res, next) {
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