var db = require("../models");
var passport = require('passport');

module.exports = function (app) {

    app.get("/", (req, res) => {
        Promise.all([db.User.findAll({ where: { admin: false } }), db.Band.findAll({})])
            .then(function (results) {
                res.render("index", { user: req.user, users: results[0], bands: results[1], helpers: {
                    randomStars: function() {console.log("helper got called"); return "" + Math.floor((Math.random() * 4) + 1);}
                } });
            });
    });

    // TODO: This isn't working or being called at all
    // Handlebars.registerHelper("randomStars", function () {
    //     console.log("helper got called");
    //     // return Math.floor(Math.random(5) + 1);
    //     return "4";
    // });

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.get("/register", (req, res) => {
        res.render("register");
    });

    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/error' }),
        function (req, res) {
            res.redirect('/profile');
        });

    app.get('/logout',
        function (req, res) {
            req.logout();
            res.redirect('/');
        });

    app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn('/login'),
        function (req, res) {
            // console.log(" % % % % % % ");
            // console.log(req.user);
            // console.log(" % % % % % % ");
            var myBands = req.user.getBands();
            var allBands = db.Band.findAll({});
            Promise.all([myBands, allBands])
                .then(function (results) {
                    res.render("profile", { user: req.user, myBands: results[0], allBands: results[1] });
                });
        });

    app.get("/error", (req, res) => {
        res.render("error");
    });

    //
    // BANDS
    //

    app.get("/bands", (req, res) => {
        db.Band.findAll({}).then(function (results) {
            res.render("bands/all", { bands: results });
        });
    });

};
