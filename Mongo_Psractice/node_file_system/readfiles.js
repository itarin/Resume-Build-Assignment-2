// This node file allows the localhost to read a file on the computer
// the file is specified in the fs.readFile function
// the file that I placed in that location is a vanilla html file

// To run this code in the terminal go to the path that 
// contains this file and enter node <file name> 
// in the terminal. Once that step is finished you can go to
// http://localhost:8080 in your browser to view results

var http = require('http');

var fs = require('fs');
http.createServer(function (req, res) {
  //Open a file on the server and return it's content:
  fs.readFile('demofile1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);
