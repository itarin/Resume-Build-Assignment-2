
//Library Constructor and Main Obj Creation
var Library =  function(){
  this.bookList = [];
};
//Book Object Constructor
var Book = function(title, author, numPages, pubDate){
  this.title = title;
  this.author = author;
  this.numbPages = numPages;
  this.pubDate = new Date(pubDate);
};
//Add a New Book to the Library
Library.prototype.addBook = function ( book ) {
  for( var i = 0; i < this.bookList.length; i++){
      if( book.title === this.bookList[i].title ){
        return false; //If added return false
      }
    }
    this.bookList.push( book );
    return true;
};
//Remove Book By title
Library.prototype.removeBookByTitle = function( title ) {
  for( var i = 0 ; i < this.bookList.length; i++){
      if( title === this.bookList[i].title ){
        this.bookList.splice( this.bookList[i], 1 );//remove matched book
        return true;
      }
    }
  return false;//No match
};
//Remove Book By authorName
Library.prototype.removeBookByAuthor = function( authorName ) {
  for( var i = 0 ; i < this.bookList.length; i++){
      if( authorName.toLowerCase() === this.bookList[i].author.toLowerCase() ){
        this.bookList.splice( this.bookList[i], 1 );//remove matched book
        return true;
      }
    }
  return false;//No match
};
//Get Random Book and Return, otherwise return null
Library.prototype.getRandomBook = function() {
  if(this.bookList === []){
    return null
  } else {
    randomIndex = Math.floor( Math.random()*this.bookList.length ) ;
    return this.bookList[ randomIndex ];
  }
};
//Get Book by Title, return all that match title whole/partially
Library.prototype.getBookByTitle = function( title ) {
  var matched = [];
  for( var i = 0; i < this.bookList.length; i++) {
    //same as: authorInLibrary = /currentAuthor\;
    var titleRegEx = new RegExp(title, "i","g", "\S");
    if( titleRegEx.test(this.bookList[i].title) ) {
      matched.push( this.bookList[i] );
    } else {
      return null;
    }
  }
  return matched;
};
//Get Book by Title, return all that match title whole/partially
Library.prototype.getBooksByAuthor = function( authorName ) {
   var matched = [];
  for( var i = 0; i < this.bookList.length; i++) {
    //same as: authorInLibrary = /currentAuthor\;
    var authorRegEx = new RegExp(authorName, "i", "g", "\S");
    if( authorRegEx.test(this.bookList[i].author) ) {
      matched.push( this.bookList[i] );
    } else {
      return null;
    }
  }
  return matched;
};
//addBooks(books)Purpose: Takes multiple books, in the form of an array of book objects, and adds the objects to your books array
Library.prototype.addBooks= function( books ) {
  var numBooks = 0;
  for( var i = 0; i < this.bookList.length; i++){
      if( books[i] === this.bookList[i] ){
        return numBooks; //If added return false
        } else {
          numBooks++;
          this.bookList.push( books[i] );
      }
  }
  return numBooks;
};

//getAuthors()Purpose: Find the distinct authors’ names from all books in your libraryReturn: array of strings the names of all distinct authors, empty array if no books exist or if no authors exist
Library.prototype.getAuthors = function(){
  var matched = [];
  for( var i = 0; i < this.bookList.length; i++) {
   //same as: authorInLibrary = /currentAuthor\;
   var authorRegEx = new RegExp(this.bookList[i].author, "i", "g", "\S");
   if( authorRegEx.test(this.bookList[i].author) ) {
     matched.push( this.bookList[i].author );
   } else {
     return null;
   }
 }
 return matched;
}
//getRandomAuthorName()Purpose: Retrieves a random author name from your books collectionReturn: string author name, null if no books e
Library.prototype.getRandomAuthorName = function() {
  if(this.bookList === []){
    return null
  } else {
    randomIndex = Math.floor( Math.random()*this.bookList.length ) ;
    return this.bookList[ randomIndex ].author;
  }
};

//Use localstorage (http://www.w3schools.com/html/html5_webstorage.asp) and JSON.stringify to save the state of your library ●Add a more robust search function to your app to allow you to filter by one or more book properties ○the search function should return an array of book instances ●Make your library a singleton ○A prototyped book class should also be made, with each ‘book’ in your li-brary being an instance of the book class.

//Library instance
var gLib = new Library();
//Book Instance
var gIT = new Book("IT", "Stephen King", 800, 'December 17, 1995 03:24:00');
var gCatcherIntheRye = new Book("Catcher In The Rye", "JD Salinger", 200, 'December 25, 1987 03:24:00');
var gCatInTheHat = new Book("Cat In The Hat", "Dr.Sues", 20, 'December 17, 1995 03:24:00' )
//Books added to Array for testing for faster testing
gLib.addBook( gIT );
gLib.addBook( gCatcherIntheRye );
gLib.addBook( gCatInTheHat );
