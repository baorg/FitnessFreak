const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const key = require("./config/key");
const CLIENT_URL = "http://localhost:3000";
const router = require("./passport/routes/authRoutes");
const Question = require("./Ques/routes")
require('./passport/services/passport.js');

mongoose.connect('mongodb://localhost:27017/FitnessFreakDB', { useNewUrlParser: true , useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: "MY POST",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
);


app.use('/auth/google', router);
app.use('/Question', Question);
app.get('/', (req, res) => {

    res.send("Server is Up and Running")
})



app.listen(PORT, function() {
    console.log(`server is up and running on port ${PORT}`);
});