var express = require("express");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("app/public"));

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

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

