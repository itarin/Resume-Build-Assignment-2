// This file creates a server in nodejs

// Read the Query String
var http = require('http'); //this adds an http module
http.createServer( function (req, res) {
	res.writeHead( 200, {'Content-Type': 'text/html'});
	res.write(req.url);
	res.end();
}).listen( 8080 );
