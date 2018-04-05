
//Library Constructor
var Library =  function(){
  this.bookList = [];
};
//Book Object
var book = function(title, author, numPages, pubDate){
  this.title = title;
  this.author = author;
  this.numberOfPages = numPages;
  this.publishDate = new Date(pubDate);
};
//Library instance
var gLib = new Library();

//Add a New Book to the Library
gLib.prototype.addBook = function (book) {
  var newBook = book;

  for( var i; i < bookList.length; i++){
    if(newBook == bookList[i]){
      return false;
    } else {
      booksList.push( book(title, author, numPages, pubDate) );
      return true;
    }
  }
};

//Book Instance
var gIT = new book("IT", "Stephen King", 800, 'December 17, 1995 03:24:00');
var gCatcherIntheRye = new book("Catcher In The Rye", "JD Salinger", 200, 'December 25, 1987 03:24:00');
