const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000";
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/feed/app";
const isAuthenticated = require("../../Middlewares").isAuthenticated;

const { Ques, Ans, User, Tag } = require("../../Models");
const getArrayOfQues = require("../utilis").getArrayOfQues;

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", isAuthenticated, (req, res) => {
    const userid = req.user.id;
    User.findById(userid).populate('question').exec((err, user) => {

        if (err) return res.send({ err: err });
        const ques = getArrayOfQues(user.question);
        res.send({ questions: ques });
    });
});

router.get("/:id", isAuthenticated, (req, res) => {

    const id = req.params.id;

    Ques.findById(id).populate("answers").exec((err, ques) => {

        if (err) return res.send({ err: err });
        res.send({ ques: ques });
    })
});

module.exports = router;