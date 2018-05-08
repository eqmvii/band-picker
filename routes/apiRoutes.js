var db = require("../models");
var bodyParser = require("body-parser");


module.exports = function (app) {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get("/api/users", (req, res) => {
        db.User.findAll({}).then(function (results) {
            res.json(results);
        });
    });

    // currently wired up to expect POST directly from a form
    app.post("/api/users", (req, res) => {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function (newUser) {
            console.log("New user!");
            console.log(newUser);
            res.redirect("/");
        });
    })


};
