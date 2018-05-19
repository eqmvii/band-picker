// server.js

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
// SPOTIFY TEST
//

var SpotifyWebApi = require('spotify-web-api-node');

console.log("Spotify API test: ");

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: '34e84d93de6a4650815e5420e0361fd3',
    clientSecret: '5162cd8b5cf940f48702dffe096c2acb',
    redirectUri: 'http://www.example.com/callback'
});

// spotifyApi.setAccessToken('<your_access_token>');

// Retrieve an access token
spotifyApi.clientCredentialsGrant().then(
    function (data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);

        // spotifyApi.getArtist('2hazSY4Ef3aB9ATXW7F5w3')
        //     .then(function (data) {
        //         console.log('Artist information', data.body);
        //     }, function (err) {
        //         console.error(err);
        //     });

        // Search artists whose name contains 'Love'
        spotifyApi.searchArtists('Slayer')
            .then(function (data) {
                console.log('Search artists by "Slayer"', data.body);
                console.log(data.body.artists.items[0]);
            }, function (err) {
                console.error(err);
            });
    },
    function (err) {
        console.log(
            'Something went wrong when retrieving an access token',
            err.message
        );
    }
);



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
// START SERVER
//

db.sequelize.sync().then(function () {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
