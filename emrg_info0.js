console.log("*******************************************************************")
console.log("Starting Server")
console.log("*******************************************************************")

const PORT=5000;
var http = require('http');
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://torrid-fire-226.firebaseio.com");
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
    usrRef.set(
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
    var cell = req.param("cellphone");

    var name;
    var nameRef = myFirebaseRef.child(cell).child('name');
    nameRef.once('value', function(snapshot) {
    name = snapshot.val();
    console.log(name +" "+snapshot.val());
  });
    var surname;
    var surnameRef = myFirebaseRef.child(cell).child('surname');
    surnameRef.once('value', function(snapshot) {
    surname = snapshot.val();
  });
});

var server = app.listen(PORT, function(){
  console.log("Listening on port " + PORT);
});
