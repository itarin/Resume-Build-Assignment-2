// Read the Query String
// This file creates a webserver that takes the 'req.url' object coming from  
// the URL and prints it to the DOM
// To start the demo go to path with this file and type `node <file name>`
var http = require('http');
http.createServer( function (req, res) {
	res.writeHead( 200, {'Content-Type': 'text/html'});
	res.write(req.url); // this object holds the part of the url that comes after the domain name i.e. after local host
	res.end();
}).listen( 8080 );
