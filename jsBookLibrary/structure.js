//************
//Library Constructor and Main Obj Creation
//Library Singleton :
var Library;
(function(){
  var libInstance;
  Library = function () {
    //return instance if it already exists
    if(libInstance) {
      return libInstance;
    }
    libInstance = this;
    this.bookList = [];
  }
})();
//Book Object Constructor
var Book = function(cover, title, author, numPages, pubDate){
  this.cover = cover;
  this.title = title;
  this.author = author;
  this.numbPages = numPages;
  this.pubDate = new Date(pubDate);
//  this.isbn = isbn;
};
//************
//Architecture

//Initialize preset books, load table, init sort f(x),
//jQuery selectors, and call binds
Library.prototype.init = function() {
  this.presetBooks();
  this.orgLibrary();
  //tableSorter plugin setOnLoadCallback
  $('table').tablesort();
  //Initializing Jquery Selectors
  this.$submitSearch = $('#submitSearch');
  this.$getRandomBook = $('#getRandomBook');
  this.$getAuthors = $('#getAuthors');
  this.$deleteAuth = $('#deleteAuth');
  this.$moreBooks2Add = $('#moreBooks2Add');
  this.$addBookSubmit = $('#addBookSubmit');
  this.$deleteFromTable = $('#orgTable');

  this._bindEvents();
};
//LIBRARY BINDS
Library.prototype._bindEvents = function() {
  this.$submitSearch.on( 'click', $.proxy(this._handleSubmitSearch, this) );

  this.$getRandomBook.on( 'click', $.proxy(this._handleGetRandomBook, this) );

  this.$getAuthors.on( 'click', $.proxy(this._handleGetAuthors, this) );

  this.$deleteAuth.on('click', $.proxy(this._handleDeleteAuth, this) );

  this.$moreBooks2Add.on('click', $.proxy(this._handleMoreBooks2Add, this) );

  this.$addBookSubmit.on('click', $.proxy(this._handleAddBookSubmit, this) );

  this.$deleteFromTable.on('click', '#delete', $.proxy(this._handleDeleteFromTable, this) );
};
//************
//HANDLERS
//Search Library
Library.prototype._handleSubmitSearch = function() {
  var userSearched = $( '#searchLib' ).val();
  var results = this.searchLibrary( userSearched );
  $('#newBookModule h3').text('Search Results');
  this.showUserInput(results);
  this.orgLibrary();
  return true;
};
//Get and show Random Book getRandomBook
Library.prototype._handleGetRandomBook =  function() {
  var results = this.getRandomBook();
  $('#newBookModule h3').text('Book Shuffle');
  this.showUserInput(results);
  return true;
};
Library.prototype.showUserInput = function (results) {
  $(results).each(function( index, element ) {
    $('#newBookModule #bookCover').attr( 'src', element.cover);
    $('#newBookModule #bookTitle').after( element.title + "--------");
    $('#newBookModule #bookAuthor').after( element.author + "--------");
    $('#newBookModule #bookNumPages').after( element.numPages + "--------");
    $('#newBookModule #bookPubDate').after( element.pubDate + "--------");
  });
};
//Get and show Authors, from .getAuthors returned array of strings
Library.prototype._handleGetAuthors = function() {
  var results = this.getAuthors();
  $('#newBookModule h3').text('Authors in Library');
  $(results).each( function( index, element ) {
    $('#newBookModule #bookAuthor').after( element + "--------");
  });
  return true;
};
//deletes from gLib.bookList, must be full match
Library.prototype._handleDeleteAuth = function() {
  var deleteByAuth = $('#deleteAuthInput').val();
  this.removeBookByAuthor(deleteByAuth);
  $("#orgTable tbody tr").remove();
  this.orgLibrary();
  return true;
};
//Inputs
//Add more than one book
Library.prototype._handleMoreBooks2Add = function(event) {
  event.preventDefault();
  this.displayBook();
  return true;
};
//Modal, save changes
Library.prototype._handleAddBookSubmit = function() {
  event.preventDefault();
  this.displayBook();
  return true;
};
//**************
//TABLE F(x)'s
//Delete from table by Clicking X and remove from library
Library.prototype._handleDeleteFromTable = function(e) {
  event.preventDefault();
  var $tr = $(e.currentTarget).parent("tr");
  var getTitle = $(e.currentTarget).siblings(".getTitle").text();
  this.removeBookByTitle(getTitle);
  $tr.remove();
  return true;
};
//F(x)'s from previous CL requirments
//Add a New Book to the Library
Library.prototype.addBook = function ( book ) {
  for( var i = 0; i < this.bookList.length; i++){
    if( book.title === this.bookList[i].title ){
      $('#bookTitle').text('Book cannot be added, it is already in Library.')
      return false; //If added return false
    }
  }
  this.bookList.push( book );
  return true;
};
//Remove Book By title
Library.prototype.removeBookByTitle = function( title ) {
  for( var i = this.bookList.length - 1 ; i >= 0; i--){
      if( title.toLowerCase() === this.bookList[i].title.toLowerCase() ){
        this.bookList.splice( i, 1 );//remove matched book
        return true;
      }
    }
  return false;//No match
};
//Remove Book By authorName
Library.prototype.removeBookByAuthor = function( authorName ) {
  for( var i = this.bookList.length - 1 ; i >= 0; i--){
      if( authorName.toLowerCase() === this.bookList[i].author.toLowerCase() ){
        this.bookList.splice( i, 1 );//remove matched book
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
    randomIndex = Math.floor( Math.random() * this.bookList.length ) ;
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
    }
  }
  return matched;
};
//addBooks(books)Purpose: Takes multiple books, in the form of an array of book objects, and adds the objects to your books array
Library.prototype.addBooks = function( books ) {
  var numBooks = 0;
  if( books.length>0 ){
    numBooks = books.length;
    this.bookList = this.bookList.concat( books );
    return this.bookList;
  }else{
    return numBooks;
  }
};
//getAuthors()Purpose: Find the distinct authors’ names from all books in your library. Return: array of strings the names of all distinct authors, empty array if no books exist or if no authors exist
Library.prototype.getAuthors = function() {
  var matched = [];
  for( var i = 1; i < this.bookList.length; i++) {
   //same as: authorInLibrary = /currentAuthor\;
   var authorRegEx = new RegExp(this.bookList[i].author, "i", "g", "\S");
   if( !authorRegEx.test(this.bookList[i-1].author) ) {
     matched.push( this.bookList[i].author );
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
//Use localstorage (http://www.w3schools.com/html/html5_webstorage.asp) and JSON.stringify to save the state of your library ●
Library.prototype.storeLocal = function(gLibKey){
  for(var i=0; i<this.bookList.length; i++){
    // Put the object into storage
    localStorage.setItem('gLibKey', JSON.stringify(gLibKey) );
  }
};
Library.prototype.getLocal = function(gLibKey){
  // Retrieve the object from storage
  var retrievedObject = JSON.parse(localStorage.getItem('gLibKey'));
  console.log('retrievedObject: ', retrievedObject);
  return true;
}
// Add a more robust search function to your app
Library.prototype.searchLibrary = function(searchValue){
  var matched = [];
  for( var i = 0; i < this.bookList.length; i++) {
    //same as: authorInLibrary = /currentAuthor\;
    var authorRegEx = new RegExp(searchValue, "i", "g", "\S");
    if( authorRegEx.test(this.bookList[i].author)||authorRegEx.test(this.bookList[i].title)||authorRegEx.test(this.bookList[i].numPages)||authorRegEx.test(this.bookList[i].pubDate) ) {
      matched.push( this.bookList[i] );
    }
  }
  return matched;
};
//CREATE A NEW BOOK F(x)
Library.prototype.newBook = function(cover, title, author, numPages, pubDate){
  var bookCreated = new Book( cover, title, author, numPages, pubDate);
  this.addBook(bookCreated);
  return true;
};
//Gets user input values to enter into gLib.bookList array and simultaneously display books by calling display Added
Library.prototype.displayBook = function() {
  var cover1 = document.getElementById("coverInput").value;
  var title1 = document.getElementById("titleInput").value;
  var author1 = document.getElementById("authorInput").value;
  var numPages1 = document.getElementById("numPagesInput").value;
  var pubDate1 = $("pubDateInput").val();

  this.newBook(cover1, title1, author1, numPages1, pubDate1);
  this.displayAdded(cover1, title1, author1, numPages1, pubDate1);
  $('#coverInput, #titleInput, #authorInput, #numPagesInput, #pubDateInput').val("");
  return true;
};
//Display Book attribute in card above table
Library.prototype.displayAdded = function(cover1, title1, author1, numPages1, pubDate1) {
  $('#bookCover').attr('src', cover1);
  document.getElementById("bookTitle").innerHTML = "Title : " + title1;
  document.getElementById("bookAuthor").innerHTML = "Author : " + author1;
  document.getElementById("bookNumPages").innerHTML = "Total Pgs : " + numPages1;
  document.getElementById("bookPubDate").innerHTML = "Publication Date : " + pubDate1;
  this.orgLibrary(cover1, title1, author1, numPages1, pubDate1);
  return true;
}
//Not using at the moment as Client requested a table for proof of concept
//displays the books in the library to user as cards
Library.prototype.populateUiLibrary = function() {
  var currentData= [];
  for(var i = 0; i <this.bookList.length; i++) {
      currentData=  this.bookList[i].title + " " +
                    this.bookList[i].author + " " +
                    this.bookList[i].numPages + " " +
                    this.bookList[i].pubDate;

// Cards that populateUILib
      // $('table tr').append("<td><div class='card bg-transparent'><div class='card-body bg-dark'> " + currentData + "</div></div></td>");
  };
};
//displays the books in the library table RENDERS ROWS
Library.prototype.orgLibrary = function(cover1, title1, author1, numPages1, pubDate1) {
  $("#orgTable tbody tr").remove();
  var currentData;
  for(var i = 0; i < this.bookList.length; i++) {
      currentData =  "<tr class='flex-wrap align-content-between' >" +
                        "<td>" +
                          "<img class='img-thumbnail w-50 p-0 ml-5 border-0' src='" + this.bookList[i].cover + "'>"  +
                        "</td>" +
                        "<td class='getTitle'>" +
                          this.bookList[i].title +
                        "</td>" +
                        "<td class='getAuthor'>" +
                          this.bookList[i].author +
                        "</td>" +
                        "<td>" +
                          this.bookList[i].numPages +
                        "</td>" +
                        "<td>" +
                          this.bookList[i].pubDate +
                        "</td>" +
                        "<td id='delete' class='text-right lilOpacity'>" +
                          "<i class='material-icons text-light'>cancel</i>" +
                        "</td>"
                      "</tr>";
      $('#orgTable').append( currentData );
  };
};
//Preset Books so Library isn't empty on load
Library.prototype.presetBooks = function() {
  var gIT = new Book("assets/readingBook.jpg", "IT", "Stephen King", 800, 'December 17, 1995 03:24:00');
  var gCatcherIntheRye = new Book("assets/readingBook.jpg", "Catcher In The Rye", "JD Salinger", 200, 'December 25, 1987 03:24:00');
  var gCatInTheHat = new Book("assets/readingBook.jpg", "Cat In The Hat", "Dr.Sues", 20, 'December 17, 1995 03:24:00' );
  var book1 = new Book("assets/readingBook.jpg", "one", "Stephen King", 3, 'December 17, 1995 03:24:00');
  var quixote= new Book("assets/readingBook.jpg", "Don Quixote", "Miguel de Cervantes Saavedra", 234, 'Dec 31, 1999');
  var q= new Book("assets/readingBook.jpg", "Don te", "Miguel vantesra", 23, 'Dec 1, 1999');
  var q1= new Book("assets/readingBook.jpg", "Don te1", "Miguel11 vantesra", 213, 'Dec 111, 1999');
  var bookArray = [quixote, q, q1];
  //Books added to Array for testing for faster testing
  this.addBook( gIT );
  this.addBook( gCatcherIntheRye );
  this.addBook( gCatInTheHat );
  this.addBook( book1 );
}
//*********************//
//Doc.Ready
$(document).ready( function() {
  //initialize Library
  window.gLib = new Library();
  window.gLib.orgLibrary();
  window.gLib.init();
  //local localStorage
  window.gLib.storeLocal(gLib);
  //GOOGLE BOOKS API
  google.books.load();

  function initialize() {
    var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    viewer.load('ISBN:0521093597');
  }

  google.books.setOnLoadCallback(initialize);
});//End Doc.Ready
