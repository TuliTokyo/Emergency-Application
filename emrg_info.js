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
    var fname = req.param("fname");
    var lname = req.param("lname");
    var town = req.param("town");
    var phone = req.param("phone");
    var usrRef = myFirebaseRef.child("citizens").child(phone);

    usrRef.set(
      {
      "fname":fname,
      "lname":lname,
      "town":town
    });
    console.log("added new User...");
  });

app.get("/addService", function(req, res){
  var sname = req.param("sname");
  var town = req.param("town");
  var emphone = req.param("emphone");
  var emphonealt = req.param("emphonealt");
  var emtype = req.param("emtype");
  var residence = req.param("residence");
  var lat = req.param("lat");
  var long = req.param("long");
  var usrRef = myFirebaseRef.child("services").child(sname);

  usrRef.set(
    {
    "town":town,
    "emphone":emphone,
    "emphonealt":emphonealt,
    "emtype":emtype,
    "residence":residence,
    "location":{
      "lat":lat,
      "long":long
    }
  });
  console.log("added new Service...");
});

app.get("/emrg", function(req, res){
  var cell = req.param("phone");
  var lat = req.param("lat");
  var long = req.param("long");
  var fname;
  var lname;
  var town;
  var phone;
  var nameRef = myFirebaseRef.child("citizens").child(cell);

  nameRef.once('value', function(snapshot) {
  var data = snapshot.val();
  fname = data.fname;
  lname = data.lname;
  town = data.town;
  phone = cell;
  console.log('name: ' + fname);
  console.log('last name: ' + lname);
  console.log('town: ' + town);
  console.log('phone: ' + phone);
  console.log('lat: ' + lat);
  console.log('long: ' + long);
  });
  });

var server = app.listen(PORT, function(){
  console.log("Listening on port " + PORT);
});
