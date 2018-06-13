// This files uses the files system node module .require('fs') to 
// update a file using the .appendFile() method
// it will append it to end of the existing file.
var fs = require('fs');

fs.appendFile('mynewfile3.txt', 'This is my text.', function (err) {
	if (err) throw err;
	console.log('Updated!');
});
