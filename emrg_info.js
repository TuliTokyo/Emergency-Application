console.log("*******************************************************************")
console.log("Starting Server")
console.log("*******************************************************************")

const PORT=5000;
var http = require('http');
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://namemerge.firebaseio.com");
var express = require("express");
var app = express();

  app.get("/addUsr", function(req, res){
    var id = req.param("id");
    var name = req.param("name");
    var surname = req.param("surname");
    var device_id = req.param("device_id");
    var town = req.param("town");
    var cellphone = req.param("cellphone");
    var usrRef = myFirebaseRef.child(cellphone);
    usrRef.push(
      {
      "id":id,
      "name":name,
      "surname":surname,
      "device_id":device_id,
      "town":town,
      "cellphone":cellphone
    });
    console.log("added new User...");
  });

  app.get("/emrg", function(req, res){
    var cellphone = req.param("cellphone");
    var usrRef = myFirebaseRef.child(cellphone);
    usrRef.on("value", function(snapshot) {
     var userData = snapshot.val();
     console.log("The updated post title is " + userData);
     res.send(userData);
  });
});

var server = app.listen(PORT, function(){
  console.log("Listening on port " + PORT);
});
