// Server
var bodyParser = require("body-parser");
var express = require("express");
var express_handlebars = require("express-handlebars");
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


app.engine("handlebars", express_handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//
// AUTH
//

passport.use(new Strategy(
    function (username, password, cb) {
        db.User.findOne({ where: { username: username } }).then(user => {
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
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

app.use(express.static('public'))

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);



//
// SERVER
//

db.sequelize.sync().then(function () {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
