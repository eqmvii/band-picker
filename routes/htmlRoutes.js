var db = require("../models");

module.exports = function (app) {

    app.get("/", (req, res) => {
        db.User.findAll({}).then(function (results) {
            res.render("index", { user: req.user, users: results });
        });
    });

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.get("/error", (req, res) => {
        res.render("error");
    });

};
