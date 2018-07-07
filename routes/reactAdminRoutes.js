var db = require("../models");
var passport = require('passport');
var path = require('path');

module.exports = function (app) {

    app.get("/react/admin", (req, res) => {
        console.log('REACT SPECIFIC ROUTE CALLED');
        Promise.all([db.User.findAll({ where: { admin: false } }), db.Band.findAll({})])
            .then(function (results) {
                res.json(results);
            });
    });

    app.get("/react/test", (req, res) => {

        res.sendfile(path.join(__dirname, '../client/build', 'index.html'));
    })

}
