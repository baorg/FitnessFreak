require('dotenv').config();
// console.log('NODE ENV: ', process.env.CLOUDINARY_CLOUD_NAME);
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const { mongooseSetup, passportSetup, adminbroSetup } = require('./setup');
const mongoose = require('mongoose');
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const Router = require('./Routers');
const path = require('path');

const CONFIG = require('./config');

// const passportRouter = require("./passport/routes/authRoutes");
const logging = require("./Middlewares").logging;

const app = express();
app.use(logging);

(async() => {
    const CLIENT_URL = CONFIG.CLIENT_DOMAIN;
    const PORT = process.env.PORT || 5000;

    const connection = await mongooseSetup();

    app.use(session({
        secret: "MY-POST",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 // see below
        },
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: 30 * 24 * 60 * 60, // = 30 days
        }),
    }));
    await passportSetup(app);
    await adminbroSetup(app, connection);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // set up cors to allow us to accept requests from our client
    app.use(
        cors({
            origin: CLIENT_URL, // allow to server to accept request from different origin
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            credentials: true // allow session cookie from browser to pass through
        })
    );


    app.use(Router);
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV == 'testing') {
        console.log('Running production/testing build');
        app.use(express.static(path.join(path.dirname(path.dirname(__filename)), 'client', 'build')));
        app.get('*', (req, res) => {
            res.sendFile(path.join(path.dirname(path.dirname(__filename)), 'client', 'build', 'index.html'));
        })
    } else {
        app.get('/', (req, res) => {
            res.send(`Server is Up and Running on port ${PORT} on ${process.env.NODE_ENV} enviroment.`)
        });
    }



    await app.listen(PORT, function() {
        console.log(`server is up and running on port ${PORT} on ${process.env.NODE_ENV} enviroment.`);
    });
})();