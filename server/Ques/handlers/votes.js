const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000";
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/feed/app";
const isAuthenticated = require("../../Middlewares").isAuthenticated;
const { Ques, Ans, User, Tag } = require("../../Models");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/byUser", (req, res) => {
    const userId = req.user.id;
    const quesId = req.body.quesId;
    Ques.findById(quesId,'upDown', (err, ques) => {

            if(err) {
                return res.send({err : err});
            }
            else{
                console.log("updown = ", ques.upDown);
                let arr = ques.upDown;
                console.log("arr = ",arr);
                let index = arr.findIndex((element) => element.userId === userId);
                let result = {upvote : false, downvote : false};
                if(index != -1){
                    if(arr[index].value == 1)
                        result.upvote = true;
                    else
                        result.downvote = true;
                }
                return res.send(result);
            }
    })


})


router.post("/editVote", (req, res) => {
    const userId = req.user.id;
    const quesId = req.body.quesId;
    const up = req.body.up;
    const down = req.body.down;
    console.log("up = ", up);
    console.log("down = ", down);
    Ques.findById(quesId,'upDown', (err, ques) => {

            if(err) {
                return res.send({err : err});
            }
            else{
                let arr = ques.upDown;
                let index = arr.findIndex((element) => element.userId === userId);
                let result = {upvote : false, downvote : false};
                if(index != -1){

                    if(arr[index].value == 1){
                    if( down !== undefined){
                        arr.set(index, {userId, value:-1});
                         // arr[index].value = -1;
                    }
                    else
                        arr.splice(index, 1);
                    }
                    else{
                        // if(arr[index].value == -1)
                            if( up !== undefined)
                            arr.set(index, {userId, value:1});
                           // arr[index].value = 1;
                            else
                                arr.splice(index, 1);
                            
                    }
                    
                }
                else{
                    let value = (up === undefined) ? -1 : 1;
                    arr.push({userId: userId, value : value})
                      
                }
                console.log("updown = ", ques.upDown);
                console.log("arr = ",arr);
                ques.save((err) => {
                    if(err) return res.send("Error in recording response");
                    return res.send("Your respnose has been submitted succesully");
                })
                
            }
    })


})
module.exports = router;