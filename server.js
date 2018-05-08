var bodyParser = require("body-parser");
var express = require("express");
var express_handlebars = require("express-handlebars");

// var Users = require("./models/user.js");

var db = require("./models");


//
// CONFIG
//

var app = express();

const PORT = process.env.PORT || 4000;


app.engine("handlebars", express_handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



//
// ROUTES
//

app.use(express.static('public'))

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);



//
// SERVER
//

db.sequelize.sync().then(function () {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
