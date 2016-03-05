console.log("*******************************************************************")
console.log("Starting Server")
console.log("*******************************************************************")

var server = http.createServer(function (request, response) {
  var clientRequest = url.parse(request.url, true).query;

  if (clientRequest.text) {
    convert('engfemale1', queryData.text, response);
    response.writeHead(200, {
        'Content-Type': 'audio/mp3',
        'Content-Disposition': 'attachment; filename="tts.mp3"'
    });

  } else {
    response.end('No text to convert.');
  }
}).listen(8080);
