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

//
// TEMPORARY AWS STUFF
//

const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
console.log(`S3 bucket: ${S3_BUCKET}`);
aws.config.region = 'us-east-2';

// file upload boilerplate
app.get('/sign-s3', (req, res) => {
    prp();
    console.log("Sign-s3 route hit");
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    console.log(s3Params);

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            res.write(JSON.stringify({error: "didn't work"}));
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
    });
});

app.post('/save-details', (req, res) => {
    // TODO: Read POSTed form data and do something useful
    console.log('% % % % % % % % AWS POST ROUTE HIT % % % % % % % % ')
});


//
// START SERVER
//

db.sequelize.sync().then(function () {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});

//
// DEBUG
//

function prp() {
    console.log("% % % % % % % % % % % % % % % ");
}
