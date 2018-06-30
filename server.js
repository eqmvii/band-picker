// server.js

// Config
require('dotenv').config();
// Server
var express = require("express");
var express_handlebars = require("express-handlebars");
var bodyParser = require('body-parser');
// Auth
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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

passport.use(new LocalStrategy(
    function (username, password, cb) {
        db.User.findOne({ where: { username: username } }).then(user => {
            if (!user) {
                return cb(null, false);
            }
            user.validPassword(password, function (res) {
                if (!res) {
                    return cb(null, false);
                }
                return cb(null, user);
            });
        });
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    db.User.findOne({ where: { id: id } }).then(user => {
        cb(null, user);
    })
});

app.use(passport.initialize());
app.use(passport.session());


//
// ROUTES
//

// TODO: Consider this for serving production React on Heroku
/*
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
*/

app.use(express.static('public'));

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);
require("./routes/aws.js")(app);



//
// START SERVER
//

db.sequelize.sync().then(function () {
    app.listen(PORT, () => {
        console.log(`@ @ @ @ @ @ @ @ @ Server running on port ${PORT} @ @ @ @ @ @ @ @ @ @ @`);
    });
});
