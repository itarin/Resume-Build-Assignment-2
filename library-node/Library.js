// Library.js
var mongoose = require('mongoose');
var LibrarySchema = new mongoose.Schema({
  title: String,
  author: String,
  numPages: Number,
  pubDate: Date,
  cover: String //Base64 Encoded
});
mongoose.model('Library', LibrarySchema);

module.exports = mongoose.model('Library');
