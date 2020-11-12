const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const Question = require("./Ques/routes").questionRouter;
const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const AdminBroExpressjs = require("@admin-bro/express");
require('./passport/services/passport.js');

const app = express();

AdminBro.registerAdapter(AdminBroMongoose);


mongoose.set("useCreateIndex", true);

const logging = require("./Middlewares").logging;
const passportRouter = require("./passport/routes/authRoutes");

app.use(logging);
app.use(bodyParser.urlencoded({ extended: true }));


const CLIENT_URL = "http://localhost:3000";
const PORT = process.env.PORT || 5000;

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


app.use('/auth/google', passportRouter);
app.use('/Question', Question);
app.get('/', (req, res) => {
    res.send("Server is Up and Running")
});


(async() => {
    const { User, Ques, Ans, Tag, Comment, } = require("./Models");
    const connection = await mongoose.connect(
        'mongodb://localhost:27017/FitnessFreakDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    const adminBro = new AdminBro({
        rootPath: '/admin',
        databases: [connection],
        resources: [User, Ques, Ans, Tag, Comment],
    });
    const router = AdminBroExpressjs.buildRouter(adminBro);
    app.use(adminBro.options.rootPath, router);
    await app.listen(PORT, function() {
        console.log(`server is up and running on port ${PORT}`);
    });
})();