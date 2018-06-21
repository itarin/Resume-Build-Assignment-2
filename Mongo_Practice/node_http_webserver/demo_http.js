//** Read Me **
//This file creates an http server using node.js
//from the w3schools tutorial, this is a stand alone file
//there are no other files associated with it
//:::::::::T*O***R*U*N::::::::::
// go to path containinge this file and type node <filename>

var http = require('http');

// Create a server object:
http.createServer( function (req, res) {
	res.writeHead(200, {'Content-type': 'text/html'});
	res.write('Hello World, we have created a local node server!'); // Write a response to the client
	res.end(); // End the response
}).listen( 8080 ); // The server object listens on port 8080
