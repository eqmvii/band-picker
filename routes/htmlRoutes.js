var db = require("../models");
var passport = require('passport');




module.exports = function (app) {


    app.get("/", (req, res) => {
        Promise.all([db.User.findAll({ where: { admin: false } }), db.Band.findAll({})])
            .then(function (results) {
                res.render("index", { user: req.user, users: results[0], bands: results[1], helpers: {
                    randomStars: randomStars,
                    getFormattedTimeString: getFormattedTimeString
                } });
            });
    });

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


    //
    // HANDLEBARS HELPER FUNCTIONS
    //

    function randomStars() {
        console.log("helper got called");
        return "" + Math.floor((Math.random() * 10) + 1);
    }

    function minuteFormat(time) {
        if (time == "0") {
            return "00";
        } else {
            return time;
        }
    }

    function getFormattedTimeString(time) {
        console.log(time);
        var master_time = new Date(time);
        var date = master_time.toDateString();
        date = date.substring(0, date.length - 4);
        time = master_time.getHours() + ":" + minuteFormat(master_time.getMinutes());
       return "Time: " + date + time;
    }

};
