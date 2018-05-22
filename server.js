// server.js

// Config
require('dotenv').config();
// Server
var express = require("express");
var express_handlebars = require("express-handlebars");
var bodyParser = require('body-parser');
// Auth
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
// Database
var db = require("./models");


//
// CONFIG
//

var app = express();

const PORT = process.env.PORT || 4000;

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false })); // TODO: idk maybe a better secret
app.engine("handlebars", express_handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//
// AUTH
//

passport.use(new Strategy(
    function (username, password, cb) {
        console.log(`checking ${username} and ${password}...`);
        db.User.findOne({ where: { username: username } }).then(user => {
            console.log(`found: `);
            console.log(user);
            if (!user) { return cb(null, false); }
            if (user.password !== password) { return cb(null, false); }
            return cb(null, user);
        });
    }));

passport.serializeUser(function (user, cb) {
    console.log(`serialize called with: `);
    console.log(user);
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    console.log(`deserialize called with :`);
    console.log(id);
    db.User.findOne({ where: { id: id } }).then(user => {
        cb(null, user);
    })
});

app.use(passport.initialize());
app.use(passport.session());


//
// ROUTES
//

app.use(express.static('public'));

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);
require("./routes/aws.js")(app);



//
// START SERVER
//

db.sequelize.sync().then(function () {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
