
//Library Constructor and Main Obj Creation
var Library =  (function () {
    // Instance stores a reference to the Singleton
    var instance;
    function init() {
      // Singleton
      // Private methods and variables
      function privateMethod(){
          console.log( "I am private" );
      }
      
    };
      return {
        // Public methods and variables
        this.bookList : [],
        //Add a New Book to the Library
        addBook : function ( book ) {
          for( var i = 0; i < this.bookList.length; i++){
              if( book.title === this.bookList[i].title ){
                return false; //If added return false
              }
            }
            this.bookList.push( book );
            return true;
        },
        //Remove Book By title
        removeBookByTitle : function( title ) {
          for( var i = 0 ; i < this.bookList.length; i++){
              if( title === this.bookList[i].title ){
                this.bookList.splice( this.bookList[i], 1 );//remove matched book
                return true;
              }
            }
          return false;//No match
        },
        //Remove Book By authorName
        removeBookByAuthor : function( authorName ) {
          for( var i = this.bookList.length - 1 ; i >= 0; i--){
              if( authorName.toLowerCase() === this.bookList[i].author.toLowerCase() ){
                this.bookList.splice( i, 1 );//remove matched book
                // return true;
              }
            }
          // return false;//No match
        },
        //Get Random Book and Return, otherwise return null
        getRandomBook : function() {
          if(this.bookList === []){
            return null
          } else {
            randomIndex = Math.floor( Math.random()*this.bookList.length ) ;
            return this.bookList[ randomIndex ];
          }
        },
        //Get Book by Title, return all that match title whole/partially
        getBookByTitle : function( title ) {
          var matched = [];
          for( var i = 0; i < this.bookList.length; i++) {
            //same as: authorInLibrary = /currentAuthor\;
            var titleRegEx = new RegExp(title, "i","g", "\S");
            if( titleRegEx.test(this.bookList[i].title) ) {
              matched.push( this.bookList[i] );
            }
          }
          return matched;
        },
        //Get Book by Title, return all that match title whole/partially
        getBooksByAuthor : function( authorName ) {
          var matched = [];
          for( var i = 0; i < this.bookList.length; i++) {
            //same as: authorInLibrary = /currentAuthor\;
            var authorRegEx = new RegExp(authorName, "i", "g", "\S");
            if( authorRegEx.test(this.bookList[i].author) ) {
              matched.push( this.bookList[i] );
            }
          }
          return matched;
        },
        //addBooks(books)Purpose: Takes multiple books, in the form of an array of book objects, and adds the objects to your books array
        addBooks : function( books ) {
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
        },
        //getAuthors()Purpose: Find the distinct authors’ names from all books in your library. Return: array of strings the names of all distinct authors, empty array if no books exist or if no authors exist
        getAuthors : function(){
          var matched = [];
          for( var i = 1; i < this.bookList.length; i++) {
           //same as: authorInLibrary = /currentAuthor\;
           var authorRegEx = new RegExp(this.bookList[i].author, "i", "g", "\S");
           if( !authorRegEx.test(this.bookList[i-1].author) ) {
             matched.push( this.bookList[i].author );
           }
         }
         return matched;
       },
        //getRandomAuthorName()Purpose: Retrieves a random author name from your books collectionReturn: string author name, null if no books e
        getRandomAuthorName : function() {
          if(this.bookList === []){
            return null
          } else {
            randomIndex = Math.floor( Math.random()*this.bookList.length ) ;
            return this.bookList[ randomIndex ].author;
          }
        },
        //Use localstorage (http://www.w3schools.com/html/html5_webstorage.asp) and JSON.stringify to save the state of your library ●
        storeLocal : function(){

          for(var i=0; i<this.bookList.length; i++){
            // Put the object into storage
            localStorage.setItem('gLibKey', JSON.stringify(gLib) );
          }
          // Retrieve the object from storage
          var retrievedObject = JSON.parse(localStorage.getItem('gLibKey'));
          console.log('retrievedObject: ', retrievedObject);
        },
        // Add a more robust search function to your app to allow you to filter by one or more book properties ○the search function should return an array of book instances ●Make your library a singleton ○A prototyped book class should also be made, with each ‘book’ in your li-brary being an instance of the book class.
          searchLibrary : function(searchValue){
            var matched = [];
            for( var i = 0; i < this.bookList.length; i++) {
            //same as: authorInLibrary = /currentAuthor\;
              var authorRegEx = new RegExp(searchValue, "i", "g", "\S");
              if( authorRegEx.test(this.bookList[i].author)||authorRegEx.test(this.bookList[i].title)||authorRegEx.test(this.bookList[i].numPages)||authorRegEx.test(this.bookList[i].pubDate) ) {
                matched.push( this.bookList[i] );
              }
            }
            return matched;
          },
            newBook : function(title, author, numPages, pubDate){
              var bookCreated = new Book( title, author, numPages, pubDate);
              this.addBook(bookCreated.title);
            },
            displayBook : function() {
              dataTitle = document.getElementById("titleInput").value;
              dataAuthor = document.getElementById("authorInput").value;
              dataNumPages = document.getElementById("numPagesInput").value;
              dataPubDate = document.getElementById("pubDateInput").value;
              gLib.newBook(dataTitle, dataAuthor, dataNumPages, dataPubDate);

              //Display Book
              document.getElementById("bookTitle").innerHTML = "Title : " + dataTitle;
              document.getElementById("bookAuthor").innerHTML = "Author : " + dataAuthor;
              document.getElementById("bookNumPages").innerHTML ="Total Pgs : " + dataNumPages;
              document.getElementById("bookPubDate").innerHTML = "Publication Date : " + dataPubDate;
            }
      };
    return {
      // Get the Singleton instance if one exists
      // or create one if it doesn't
      getInstance: function () {
        if ( !instance ) {
          instance = init();
        }
        return instance;
      }
    };
  })();
//Library instance to store
var gLib = new Library();
//Book Instance
var gIT = new Book("IT", "Stephen King", 800, 'December 17, 1995 03:24:00');
var gCatcherIntheRye = new Book("Catcher In The Rye", "JD Salinger", 200, 'December 25, 1987 03:24:00');
var gCatInTheHat = new Book("Cat In The Hat", "Dr.Sues", 20, 'December 17, 1995 03:24:00' );
var book1 = new Book("one", "Stephen King", 3, 'December 17, 1995 03:24:00');
bookArray = [{title:"one",author:"two",numPages: 3,pubDate: 4}, {title:"ofne",author:"twfo",numPages: 3,pubDate: 4}];
//Books added to Array for testing for faster testing
gLib.addBook( gIT );
gLib.addBook( gCatcherIntheRye );
gLib.addBook( gCatInTheHat );
gLib.addBook( book1 );


//GOOGLE BOOKS API
google.books.load();

function initialize() {
  var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
  viewer.load('ISBN:0521093597');
}

google.books.setOnLoadCallback(initialize);
