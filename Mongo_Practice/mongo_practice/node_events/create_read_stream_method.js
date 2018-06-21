// Objects in node.js can fire events, the readStream object 
// fires events when opening and closing a file:

var fs = require('fs');
var rs = fs.createReadStream('./demofile.txt');
res.on('open', function () {
	console.log('The file is open');
});

