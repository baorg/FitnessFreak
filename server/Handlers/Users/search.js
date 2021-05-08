const express = require("express");
const { User } = require("../../Models");

async function searchUserHandler(req, res, next) {
    try {
        let filter = req.body.username;
        let regexp = new RegExp("^" + filter);
        let users = await User.find({ username: { $regex: regexp } })
            .select('username profile_image first_name last_name').exec();
        res.data.success = true;
        res.data.users = users;
    } catch (err) {
        console.error('ERROR ', err);
        res.data.success = false;
        res.data.users = [];
        res.data.error = 'Some internal error.';
    } finally {
        next();
    }
}

async function getSuggestions(req, res, next) {
    try {
        // if user logged in
        let user_followings = new Set();

        if (req.user) {
            (await User.findOne({ _id: req.user._id }, 'following').exec())
            .following.map(u => user_followings.add(u.toString()));
            // console.log(user_followings);
            user_followings.add(req.user.id);
        }


        let users = await User.find({}, 'id username first_name last_name profile_image score is_verified').exec();

        users = users.filter(user => !user_followings.has(user.id));

        users.sort((a, b) => {
            let a_score = a.score.find(t => t.name === 'totalScore');
            let b_score = b.score.find(t => t.name === 'totalScore');
            return (b_score ? b_score.score : 0) - (a_score ? a_score.score : 0);
        });

        res.data.success = true;
        res.data.suggestions = users.slice(0, 10);
    } catch (err) {
        console.log('ERROR:', err);
        res.data.success = false;
        res.data.error = 'Some internal error.'
    } finally {
        return next();
    }
}

module.exports = {
    searchUserHandler,
    getSuggestions
};