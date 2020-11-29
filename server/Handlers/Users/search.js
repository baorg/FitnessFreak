const express = require("express");
const { User } = require("../../Models");

module.exports = function(req, res) {
    let filter = req.body.username;
    let regexp = new RegExp("^" + filter);
    User.find({ username: { $regex: regexp } }).select('username').exec().then(users => {
        console.log('filter:', filter);
        console.log('Users:', users);
        return res.send({ newArr: users });
    }).catch(err => {
        console.log('ERROR:', err);
        return res.send({})
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