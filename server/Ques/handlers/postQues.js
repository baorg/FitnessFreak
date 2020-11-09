
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

router.use(bodyParser.urlencoded({ extended: true }));
router.post("/", isLoggedIn, (req, res) => {

   const user_id = req.user.id;
   const category = req.body.category;
   const tags = req.body.tags;
   const question = req.body.Ques;


   const ques = new Ques({ 
                            question : question,
                            upDown : [],
                            answers : [],
                            categoryName : category,
                            userId : user_id,
                        })

    ques.save(err => {

        if(err) return res.redirect(CLIENT_LOGIN_PAGE_URL);

        User.findById(user_id).exec((err, user) => {

            user.question.push(ques._id);
            user.save(err => { 
                if(err) return res.redirect(CLIENT_LOGIN_PAGE_URL) 
                return res.redirect(CLIENT_HOME_PAGE_URL);
            })
        })
    })
})



module.exports = router