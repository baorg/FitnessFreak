
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
    console.log('i am here')
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
        else{
        User.findById(user_id).exec((err, user) => {

            user.answer.push(ans._id);
            user.save(err => { 
                if(err) return res.redirect(CLIENT_LOGIN_PAGE_URL) 
                else
                {
                    Ques.findById(quesId).exec((err, ques) => {

                        ques.answers.push(ans._id);
                        ques.save(err => { 
                            if(err) return res.redirect(CLIENT_LOGIN_PAGE_URL) 
                             res.redirect(CLIENT_HOME_PAGE_URL);
                        })
                    })
                }
            })
        })
        }
    })
})



module.exports = router