//Library constructor and functions bellow:

//Library Constructor and Main Obj Creation
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
var Book = function(cover, title, author, numPages, pubDate, isbn){
  this.cover = cover;
  this.title = title;
  this.author = author;
  this.numbPages = numPages;
  this.pubDate = new Date(pubDate);
  this.isbn = isbn;
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
  for( var i = this.bookList.length - 1 ; i >= 0; i--){
      if( authorName.toLowerCase() === this.bookList[i].author.toLowerCase() ){
        this.bookList.splice( i, 1 );//remove matched book
        // return true;
      }
    }
  // return false;//No match
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
Library.prototype.getAuthors = function(){
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

//Library instance to store
var gLib = new Library();

//Use localstorage (http://www.w3schools.com/html/html5_webstorage.asp) and JSON.stringify to save the state of your library ●
Library.prototype.storeLocal = function(){

  for(var i=0; i<this.bookList.length; i++){
    // Put the object into storage
    localStorage.setItem('gLibKey', JSON.stringify(gLib) );
  }
  // Retrieve the object from storage
  var retrievedObject = JSON.parse(localStorage.getItem('gLibKey'));
  console.log('retrievedObject: ', retrievedObject);
};
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
Library.prototype.newBook = function(title, author, numPages, pubDate){
  var bookCreated = new Book( title, author, numPages, pubDate);
  this.addBook(bookCreated);
};
//Display Book in Window
Library.prototype.displayAdded = function(){
  $('#bookCover').attr('src', dataCover);
  document.getElementById("bookTitle").innerHTML = "Title : " + dataTitle;
  document.getElementById("bookAuthor").innerHTML = "Author : " + dataAuthor;
  document.getElementById("bookNumPages").innerHTML ="Total Pgs : " + dataNumPages;
  document.getElementById("bookPubDate").innerHTML = "Publication Date : " + dataPubDate;
  gLib.newBook(dataCover, dataTitle, dataAuthor, dataNumPages, dataPubDate, isbn);
  this.orgLibrary();
}

//User Interface to enter into gLib.bookList arrayand simultaneously display books
Library.prototype.displayBook = function() {
  dataCover = document.getElementById("coverInput").value;
  dataTitle = document.getElementById("titleInput").value;
  dataAuthor = document.getElementById("authorInput").value;
  dataNumPages = document.getElementById("numPagesInput").value;
  dataPubDate = $("pubDateInput").val();
  gLib.newBook(dataCover, dataTitle, dataAuthor, dataNumPages, dataPubDate, isbn);

  this.displayAdded();
};
//displays the books in the library to user
Library.prototype.populateUiLibrary = function(){
  var currentData= [];
  for(var i = 0; i <this.bookList.length; i++){
      currentData=  this.bookList[i].title + " " +
                    this.bookList[i].author + " " +
                    this.bookList[i].numPages + " " +
                    this.bookList[i].pubDate;

// Cards that populateUILib
      // $('table tr').append("<td><div class='card bg-transparent'><div class='card-body bg-dark'> " + currentData + "</div></div></td>");
  };
};
//displays the books in the library table to user
Library.prototype.orgLibrary = function(){
  var currentData= [];
  for(var i = 0; i <this.bookList.length; i++){
      currentData =  "<tr class='flex-wrap align-content-between'>" +
                        "<td>" +
                          "<img class='img-thumbnail w-50 p-0 ml-5 border-0' src='" + this.bookList[i].cover + "'>"  +
                        "</td>" +
                        "<td id='getTitle'>" +
                          this.bookList[i].title +
                        "</td>" +
                        "<td id='getAuthor'>" +
                          this.bookList[i].author +
                        "</td>" +
                        "<td>" +
                          this.bookList[i].numPages +
                        "</td>" +
                        "<td>" +
                          this.bookList[i].pubDate +
                        "</td>" +
                        "<td id='delete'class='text-right'>" +
                          "<i class='material-icons text-light'>cancel</i>" +
                        "</td>"
                      "</tr>";
      $('#orgTable').append( currentData );
  };
};
//Book Instance
var gIT = new Book("assets/readingBook.jpg", "IT", "Stephen King", 800, 'December 17, 1995 03:24:00');
var gCatcherIntheRye = new Book("assets/readingBook.jpg", "Catcher In The Rye", "JD Salinger", 200, 'December 25, 1987 03:24:00');
var gCatInTheHat = new Book("assets/readingBook.jpg", "Cat In The Hat", "Dr.Sues", 20, 'December 17, 1995 03:24:00' );
var book1 = new Book("assets/readingBook.jpg", "one", "Stephen King", 3, 'December 17, 1995 03:24:00');
var quixote= new Book("assets/readingBook.jpg", "Don Quixote", "Miguel de Cervantes Saavedra", 234, 'Dec 31, 1999');
var q= new Book("assets/readingBook.jpg", "Don te", "Miguel vantesra", 23, 'Dec 1, 1999');
var q1= new Book("assets/readingBook.jpg", "Don te1", "Miguel11 vantesra", 213, 'Dec 111, 1999');
var bookArray = [quixote, q, q1];
//Books added to Array for testing for faster testing
gLib.addBook( gIT );
gLib.addBook( gCatcherIntheRye );
gLib.addBook( gCatInTheHat );
gLib.addBook( book1 );

$(document).ready(function(){
    gLib.orgLibrary();//Store HERE ONLY FOR BUILD************************************
    //Menu F(x)'s

    //Search Library
    $('#submitSearch').on( 'click', function(){
      var userSearched = $( '#searchLib' ).val();
      var results = gLib.searchLibrary( userSearched );
      $('#newBookModule h3').text('Search Results');
      $(results).each(function( index, element ) {
        $('#newBookModule #bookCover').attr( 'src', element.cover);
        $('#newBookModule #bookTitle').after( element.title + "--------");
        $('#newBookModule #bookAuthor').after( element.author + "--------");
        $('#newBookModule #bookNumPages').after( element.numPages + "--------");
        $('#newBookModule #bookPubDate').after( element.pubDate + "--------");
      });
      gLib.orgLibrary();
    });
    //Get and show Random Book getRandomBook
    $('#getRandomBook').on( 'click', function(){
      var results = gLib.getRandomBook();
      $('#newBookModule h3').text('Book Shuffle');
      $(results).each(function( index, element ) {
        $('#newBookModule #bookCover').attr( 'src', element.cover);
        $('#newBookModule #bookTitle').after( element.title + "--------");
        $('#newBookModule #bookAuthor').after( element.author + "--------");
        $('#newBookModule #bookNumPages').after( element.numPages + "--------");
        $('#newBookModule #bookPubDate').after( element.pubDate + "--------");
      });
    });
    //Select Delete by Author from menu
    //Clones and Adds Input
    $('#deleteAuthor').on( 'click', function(){
      $('#searchLib').clone().appendTo('.form-inline')
        .attr('placeholder', 'Enter Author to Delete')
        .attr('id','deleteAuthInput');
      $('#submitSearch').clone().appendTo('.form-inline')
        .html('<i class="material-icons text-dark">cancel</i>')
        .attr('id','deleteAuth');
    });
    $('#deleteAuth').on('click', function(){
      var deleteByAuth = $('#deleteAuth').val();
      window.gLib.removeBookByAuthor(deleteAuth);
    });
    //INPUT UI F(x)'s
    //OnClick of Menu Display .addMore UI to ADD ONE Book
    $('#moreBooks2Add').on('click', function(event){
      event.preventDefault();

    });
    //Modal, save changes
    $('#addBookSubmit').on('click', function(){

      gLib.displayBook()
    });
//TABLE F(x)'s
  //Delete from table and remove from library
  $('tbody').on('click', '#delete', function(){
    event.preventDefault();
    $('#delete').parent().remove();
    var bTitle=$('#getTitle').text();
    gLib.removeBookByTitle(bTitle);
  });
  //Delete from table and remove from library
  $('tbody').on('click', '#delete', function(){
    event.preventDefault();
    $('#delete').parent().remove();
    var bTitle=$('#getTitle').text();
    gLib.removeBookByTitle(bTitles);
  });
  //tableSorter plugin setOnLoadCallback
  $('table').tablesort();
  //GOOGLE BOOKS API
  google.books.load();

  function initialize() {
    var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    viewer.load('ISBN:0521093597');
  }

  google.books.setOnLoadCallback(initialize);

});
