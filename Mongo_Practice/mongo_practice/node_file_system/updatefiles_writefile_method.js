var fs = require('fs');

fs.writeFile('mynewfile3.txt', 'No, this is my text', function (err) {
	if (err) throw err;
	console.log('Replaced!');
});
