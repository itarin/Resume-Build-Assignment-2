// This file uses the node file system module require('fs') to create a file
// it does so using the fs.open() method
//
//


var fs = require('fs')

// fs.open() takes a second argument or flag, here used is 'w' so a specified   
// file is opened for writing, if the file doesn't exist it is created.
fs.open('mynewfile2.txt', 'w', function (err, file) {
	if (err) throw err;
	console.log('Saved!');
});

