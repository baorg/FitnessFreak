const passport = require("passport");
const express = require("express");
const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/feed/app"
const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000"

const CLIENT_USERNAME_SET_PAGE="http://localhost:3000/feed/set-username"
// const User = require("../../Users/model").User;
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/", passport.authenticate('google', {
    scope : ["profile"]
}  
));

router.get("/feed",
 passport.authenticate('google', {
        successRedirect: CLIENT_LOGIN_PAGE_URL,
        failureRedirect: CLIENT_LOGIN_PAGE_URL
    }
     )
     //,function(req,res){
//         if(req.user.userName===undefined)
//         res.redirect(CLIENT_USERNAME_SET_PAGE);
//         else
//         res.redirect(CLIENT_HOME_PAGE_URL);
//     }
 );



// router.post("/set-username",function(req,res){
//     console.log('hi');
//     console.log(req.user);
//     User.findById(req.user.id, function(err, user) {
//         if(user){
//         console.log('hello');
//         console.log(req.body);
//         user.userName=req.body.a;
//         console.log(user.userName);
//         user.save(function(){
//             res.redirect(CLIENT_HOME_PAGE_URL);
//         });
//         }
//     });
// })



// router.get('/allow-access',function(req,res){
//     console.log('hi im here');  
//     if(req.isAuthenticated()){
//         console.log('hi im here too');  
//         if(req.user.userName!==undefined){
//             console.log('gg');
//             res.send(false);
//         }
//     }
//     else{
//         console.log('now im here');
//         res.redirect(CLIENT_LOGIN_PAGE_URL);
//     }
// })

module.exports = router;