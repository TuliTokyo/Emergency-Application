var express = require('express');
var app = express();
var http = require('http');
var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://namemerge.firebaseio.com/");

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get("/addUsr", function(request, response){
  var id = request.param("id");
  var name = request.param("name");
  var surname = request.param("surname");
  var device_id = request.param("device_id");
  var town = request.param("town");
  var cellphone = request.param("cellphone");

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

app.get("/emrg", function(request, response){
  //var cellphone = req.param("cellphone");
  //var lat = req.param("lat");
  //var long = req.param("long");

  myFirebaseRef.on("value", function(snapshot) {
console.log(snapshot.val());
}, function (errorObject) {
console.log("The read failed: " + errorObject.code);
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
