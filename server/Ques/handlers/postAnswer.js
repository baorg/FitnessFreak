
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000";
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/feed/app";
const Ques = require("../../Users/model").Ques;
const Ans = require("../../Users/model").Ans;
const User = require("../../Users/model").User;
const Tag = require("../../Users/model").Tag;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.post("/", (req, res) => {

   const user_id = req.user.id;
   const quesId = req.body.quesId;
   const answer = req.body.answer;

   const ans = new Ans({ 
                            answer : answer,
                            upDown : [],
                            commentss : [],
                            userId : user_id,
                            quesId : quesId
                        })

    ans.save(err => {

        if(err) return res.redirect(CLIENT_LOGIN_PAGE_URL);

        User.findById(user_id).exec((err, user) => {

            user.question.push(ans._id);
            user.save(err => { 
                if(err) return res.redirect(CLIENT_LOGIN_PAGE_URL) 
                return res.redirect(CLIENT_HOME_PAGE_URL);
            })
        })

        Ques.findById(ques_id).exec((err, ques) => {

            ques.question.push(ans._id);
            ques.save(err => { 
                if(err) return res.redirect(CLIENT_LOGIN_PAGE_URL) 
                return res.redirect(CLIENT_HOME_PAGE_URL);
            })
        })


    })
})



module.exports = router