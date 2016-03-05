console.log("*******************************************************************")
console.log("Starting Server")
console.log("*******************************************************************")

var http = require('http');
const PORT=8888;

http.createServer(function(request, response) {

//if statements to deside what happens
response.end("Some stuff happens");


}).listen(PORT);
