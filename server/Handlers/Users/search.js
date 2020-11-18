const express = require("express");
const { User } = require("../../Models");

module.exports = function(req, res) {
    User.find({}).exec((err, users) => {
        if (err) return res.send(err);
        else {
            let filter = req.body.username;
            console.log("body is" + req.body)
            console.log("hi the filter is" + filter);
            if (filter === " ")
                res.send({ newArr: [] });
            else {
                // console.log(users);
                let newArr = [];
                users.forEach(el => {
                    if (el.userName !== undefined) {
                        if (el.userName.includes(filter))
                            newArr.push(el.userName);
                    }
                })
                console.log(newArr);
                res.send({ newArr: newArr });
            }
        }
    });
}