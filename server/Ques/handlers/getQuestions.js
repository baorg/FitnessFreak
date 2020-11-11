
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000";
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/feed/app";
const isLoggedIn = require("../../middleware").isLoggedIn;
const Ques = require("../../Users/model").Ques;
const Ans = require("../../Users/model").Ans;
const User = require("../../Users/model").User;
const Tag = require("../../Users/model").Tag;
const getArrayOfQues = require("../utilis").getArrayOfQues;

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", isLoggedIn, (req, res) => {
    const userid = req.user.id;
    User.findById(userid).populate('question').exec( (err, user) => {

        if(err) return res.send({err:err});
        const ques = getArrayOfQues(user.question);
        res.send({questions : ques});
    })

});

router.get("/:id", isLoggedIn, (req, res) => {

    const id = req.paramsid;
    Ques.findById(id, (err, ques) => {
        if(err) return res.send({err : err});
        res.send({ques : ques});
    })
});

module.exports = router;