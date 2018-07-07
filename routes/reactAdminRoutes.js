var db = require("../models");
var passport = require('passport');
var path = require('path');

module.exports = function (app) {

    app.get("/new/json", (req, res) => {
        console.log('new json blob route');
        Promise.all([db.User.findAll({ where: { admin: false } }), db.Band.findAll({})])
            .then(function (results) {
                res.json(results);
            });
    });

    app.get("/new/admin", (req, res) => {
        console.log('new react admin route called');
        res.sendfile(path.join(__dirname, '../client/build', 'index.html'));
    })

}
