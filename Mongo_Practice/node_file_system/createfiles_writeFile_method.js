// This file uses the node file system module require('fs') to create a new file using
// the .writeFile() method, that replaces the specified file and content if i exist.
// If the file doesn't exist it creates one.
//
var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
	if (err) throw err;
	console.log('Saved');
});

