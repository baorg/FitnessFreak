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
    Ques.find({}).populate({
        path: 'userId',
        model: User,
        options: {
            sort: {},
            skip: 0,
            limit: 2,
            select: '_id userName firstName lastName'
        },
    }).exec((err, questions) => {
        if (err) {
            console.error(err);
            return res.send({ err: "Some error occured." });
        } else {
            console.log('Question', questions[0].userId);
            res.send({ questions: getArrayOfQues(questions), isAuthenticated: true });
        }
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