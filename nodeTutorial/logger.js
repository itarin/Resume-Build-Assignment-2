const EventsEmitter = require('events');

var url = "http://mylogger.io/log";

class Logger extends EventsEmitter {
  //method
 log(message) {
    // Send an HTTP request
    console.log(message);
    //raise an event
    this.emit('messageLogged', {data: 1});
  }
}
module.exports = Logger;
