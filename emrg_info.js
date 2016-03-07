console.log("*******************************************************************")
console.log("Starting Server")
console.log("*******************************************************************")

const PORT=8888;
var http = require('http');
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://crackling-heat-3819.firebaseio.com/");
var express = require("express");
var app = express();

  app.get("/addUsr", function(req, res){
    var id = req.param("id");
    var name = req.param("name");
    var surname = req.param("surname");
    var device_id = req.param("device_id");
    var town = req.param("town");
    var cellphone = req.param("cellphone");

    myFirebaseRef.push(
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
    //var cellphone = req.param("cellphone");
    //var lat = req.param("lat");
    //var long = req.param("long");

    myFirebaseRef.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
  });
});


var server = app.listen(PORT, function(){
  console.log("Listening on port " + PORT);
});
