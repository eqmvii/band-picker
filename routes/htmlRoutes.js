var db = require("../models");
var passport = require('passport');

module.exports = function (app) {

    app.get("/", (req, res) => {
        db.User.findAll({}).then(function (results) {
            res.render("index", { user: req.user, users: results });
        });
    });

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/error' }),
        function (req, res) {
            res.redirect('/');
        });

    app.get('/logout',
        function (req, res) {
            req.logout();
            res.redirect('/');
        });

    app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn('/login'),
        function (req, res) {
            res.render('profile', { user: req.user });
        });

    app.get("/error", (req, res) => {
        res.render("error");
    });

};
