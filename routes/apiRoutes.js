var db = require("../models");
var passport = require('passport');

module.exports = function (app) {

    //
    // USERS
    //

    app.get("/api/users",
        require('connect-ensure-login').ensureLoggedIn('/login'),
        function (req, res) {
            console.log("api call");
            db.User.findAll({
                where: { admin: false }
            }).then(function (results) {
                console.log(`ran an all, got: `);
                console.log(results);
                res.json(results);
            });
        });

    // currently wired up to expect POST directly from a form
    app.post("/api/users", (req, res) => {
        db.User.create({
            username: req.body.username,
            password: req.body.password
        }).then(function (newUser) {
            console.log("New user!");
            console.log(newUser);
            res.redirect("/");
        });
    });

    app.put("/api/users/:id", (req, res) => {
        var idToUpdate = parseInt(req.params.id, 10);
        console.log(`PUT RECEIVED AT ${idToUpdate}`);
        console.log(req.body.username);
        console.log(req.body.password);
        db.User.update(
            {
                username: req.body.username,
                password: req.body.password
            }, {
                where: {
                    id: idToUpdate
                }
            }
        ).then(function (updatedUser) {
            console.log("updated user");
            console.log(updatedUser);
            res.end();
        });
    });

    app.delete("/api/users/:id", (req, res) => {
        var idToDelete = parseInt(req.params.id, 10);
        console.log(`idToDelete: ${idToDelete}`);
        db.User.destroy({
            where: {
                id: idToDelete
            }
        }).then(function (response) {
            console.log("Tried to delete just the one...");
            console.log(response);
            res.end();
        });
    });

    //
    // BANDS
    //

    app.get("/api/bands",
        require('connect-ensure-login').ensureLoggedIn('/login'),
        function (req, res) {
            console.log("api call");
            db.Band.findAll({}).then(function (results) {
                res.json(results);
            });
        });

    //
    // ALL
    //

    // TODO: Add administrative authentication requirement?
    app.delete("/api/all",
        require('connect-ensure-login').ensureLoggedIn('/login'),
        (req, res) => {
            db.User.destroy({
                where: {
                    admin: false
                }
            }).then(function (response) {
                db.Band.destroy({
                    where: {},
                    truncate: true
                }).then(function (response) {
                    console.log("Tried to delete everything");
                    console.log(response);
                    res.end(response);
                })
            });
        });


};
