var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("app/public"));

// Handlebars Goodness

var exphbs = require("express-handlebars");

// app.set("views", __dirname + "\\app\\views"); // TODO: Figure this out or not idk
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sequelize Goodness
var db = require("./models");
db.sequelize.sync().then(function(){
  console.log("DB connected!");

  // Create dummy data every time the server is started, for... reasons
  db.User.create({
    email: "fake@email.com",
    password: "password"
  })

  // Log just the first user lol idk
  db.User.findAll().then(function(result) {
    console.log
   console.log(result[0].dataValues);
  });

  // Use Handlebars to render the main index.html page with the movies in it.
  app.get("/", function(req, res) {
    res.render("index", { test: "walrus" });
  });

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

