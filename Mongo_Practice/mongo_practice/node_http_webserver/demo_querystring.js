// ***Read me***
// This file splits the query string into readable parts
// , it uses a node built-in module, the URL module.

// To start the server use : node <filename> while being in the 
// folder that contains <filename> that you created for this code
// then go to http://localhost:8080/?year=2018&month=June
// you can now modify the year and month values to desired choice.

var http = require('http');
var url = require('url');

http.createServer( function(req, res) { 
	res.writeHead( 200, {'Conent-Type': 'text/html'});
	var q = url.parse(req.url, true).query;
	var txt = q.year + " " + q.month;
	res.end(txt);
} ).listen( 8080 );

