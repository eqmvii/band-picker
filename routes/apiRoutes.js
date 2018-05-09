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
    });

    app.put("/api/users/:id", (req, res) => {
        var idToUpdate = parseInt(req.params.id, 10);
        console.log(`PUT RECEIVED AT ${idToUpdate}`);
        console.log(req.body.email);
        console.log(req.body.password);
        db.User.update(
            {
                email: req.body.email,
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

    app.delete("/api/users/all", (req, res) => {
        db.User.destroy({
            where: {},
            truncate: true
        }).then(function (response) {
            console.log("Tried to delete everything");
            console.log(response);
            res.end(response);
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


};
