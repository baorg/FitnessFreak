const passport = require("passport");
const express = require("express");
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/feed/app"
const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000"
const { User } = require("../../Models");
const { isAuthenticated } = require("../../Middlewares");

const CLIENT_USERNAME_SET_PAGE = "http://localhost:3000/first-time-setup"
    // const User = require("../../Users/model").User;
const bodyParser = require("body-parser");
const app = express();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())
router.get("/", passport.authenticate('google', {
    scope: ["profile"]
}));

router.get("/feed", function(req, res, next) {
        console.log('feed');
        next();
    },
    passport.authenticate('google', {
        //  {successRedirect: CLIENT_HOME_PAGE_URL,
        failureRedirect: CLIENT_LOGIN_PAGE_URL
    }
    ),function(req,res){
        if(req.user.userName===undefined)
        res.redirect(CLIENT_USERNAME_SET_PAGE);
        else
        res.redirect(CLIENT_HOME_PAGE_URL);
    }
);


router.post('/uniqueness',isAuthenticated,function(req,res){
    let userName=req.body.userName;
    console.log(userName)
    User.find({},function(err,users){
        if(err) return res.send(err);
        // users.forEach((user)=>{
        //     if(userName===user.userName){
        //         console.log("same")
        //         return res.send(false);
        //     }
        // })
        let x=users.some((user)=>user.userName===userName)
        return res.send(!x)
    })
})

router.post("/first-time-setup",isAuthenticated,function(req,res){
    console.log('hi');
    console.log(req.user);
    console.log(req.body)
    let username=req.body.username;
    let firstname=req.body.firstname;
    let lastname=req.body.lastname;
    let bio=req.body.bio;
    // console.log(username);
    // console.log(firstname);
    // console.log(lastname);
    User.findById(req.user._id, function(err, user) {
        if(user){
        console.log('hello');
        user.userName=username;
        user.firstName=firstname;
        user.lastName=lastname;
        user.bio=bio;
        // console.log(user.username);
        user.save(function(){
            res.redirect(CLIENT_HOME_PAGE_URL);
        });
        }
    });
})



router.get('/allow-access',function(req,res){
    // console.log('hi im here');  
    if(req.isAuthenticated()){
        // console.log('hi im here too');  
        if(req.user.userName!==undefined){
            // console.log('gg');
            res.send(false);
        }
        else{
            res.send(true);
        }
    }
    else{
        // console.log('now im here');
        res.redirect(CLIENT_LOGIN_PAGE_URL);
    }
})

module.exports = router;