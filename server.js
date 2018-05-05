var bodyParser = require("body-parser");
var express = require("express");
var express_handlebars = require("express-handlebars");

var db = require("./models");



//
// CONFIG
//

var app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.engine("handlebars", express_handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



//
// ROUTES
//
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.render("index", { name: "Eric" });
});



//
// SERVER
//

db.sequelize.sync().then(function() {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
