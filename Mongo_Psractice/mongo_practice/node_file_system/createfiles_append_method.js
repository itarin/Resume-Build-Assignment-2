// This file uses node module .appendFile() to create a new file in your system
// the file system module var fs = require('fs') has to be included

// While being in the same path as this current file, enter in the command line:
// node <file name>
// either an error will be thrown or 'Saved!' will appear in the terminal

var fs = require('fs');

	//Create a file on the server
	fs.appendFile('mynewfile1.txt', 'Hello content', function (err) {
		if (err) throw err;
		console.log('Saved!');
	});
