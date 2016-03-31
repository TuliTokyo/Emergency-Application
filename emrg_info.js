console.log("*******************************************************************")
console.log("*                       Starting Server                           *")
console.log("*******************************************************************")

const PORT=5000;
var http = require('http');
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://torrid-fire-226.firebaseio.com");
var express = require("express");
var app = express();
var math = require("mathjs");

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
  var comLoc = math.sum(lat, long);

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
    },
    "comLoc":comLoc
  });
  console.log('*************************');
  console.log("*   added new Service   *");
  console.log('*************************');
});

app.get("/emrg", function(req, res){
  var cell = req.param("phone");
  var lat = req.param("lat");
  var long = req.param("long");
  var fname;
  var lname;
  var town;
  var phone;
  var userRef = myFirebaseRef.child("citizens").child(cell);
  var usrLoc = math.sum(lat, long);
  var largeLoc = null;
  var smallLoc = null;

  userRef.once('value', function(snapshot) {
  var data = snapshot.val();
  fname = data.fname;
  lname = data.lname;
  town = data.town;
  phone = cell;
  console.log('********************************************************************');
  console.log('*       name:      ' + fname +'                                           *');
  console.log('*       last name: ' + lname +'                                        *');
  console.log('*       town:      ' + town +'                                       *');
  console.log('*       phone:     ' + phone +'                                      *');
  console.log('*       lat:       ' + lat +'                                      *');
  console.log('*       long:      ' + long +'                                       *');
  console.log('********************************************************************');
  });

  var servicesRef = myFirebaseRef.child("services");

    var smallerRef = servicesRef.orderByChild("comLoc").endAt(usrLoc).limitToLast(2);
/*    smallerRef.on("value", function(snapshot) {
      console.log('Snapshot Data: ' + snapshot.val());
        if (snapshot.numChildren() == 1) {
          snapshot.forEach(function(locSnapshot) {
            var tempData = locSnapshot.val();
            smallLoc = tempData.comLoc;
            console.log("Closest location to the user (Smaller number): " + smallLoc);
            console.log('smaller number is: ' + smallLoc);
            return true;
          });
        } else {
          console.log("No shorter number...");
        }

        var largerRef = servicesRef.orderByChild("comLoc").startAt(usrLoc).limitToFirst(2);
        largerRef.on("value", function(snapshot) {
          console.log('Snapshot Data: ' + snapshot.val());
            if (snapshot.numChildren() == 1) {
              snapshot.forEach(function(locSnapshot) {
                var tempData = locSnapshot.val();
                largeLoc = tempData.comLoc;
                console.log("Closest location to the user (Larger number): " + largeLoc);
                console.log('smaller number is: ' + largeLoc);
                return true;
              });
            } else {
              console.log("No Larger number...");
            }

            if (smallLoc == null || largeLoc == null) {
              console.log('we have a null');
              console.log('smallLoc: ' + smallLoc);
              console.log('largeLoc: ' + largeLoc);

            } else {
              console.log('No Nulls');
              var smallVar = math.var(usrLoc, smallLoc);
              var largeVar = math.var(usrLoc, largeLoc);

              if (smallVar < largeVar){
                console.log('*************************************************');
                console.log('*    The Smaller Location is the closest        *');
                console.log('*************************************************');
              }
              if (smallVar > largeVar){
                console.log('*************************************************');
                console.log('*    The Larger Location is the closest         *');
                console.log('*************************************************');
              } else {
                console.log('error for days....');
              }

            }
        });
    });*/


  });

var server = app.listen(PORT, function(){
  console.log("Listening on port " + PORT);
});
