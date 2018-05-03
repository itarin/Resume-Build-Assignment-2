//Library Constructor and Main Obj Creation
class Library {
  constructor(instance) {
    this.bookList = [];
    //local storage key
    this.instance = instance;
  }
  //************
  //Architecture

  //Initialize preset books, load table, init sort f(x),
  //jQuery selectors, and call binds
  init () {
    this.tempArray = [];
    this.presetBooks();
    this.makeTable();
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
  }
  //LIBRARY BINDS
  _bindEvents () {
    this.$submitSearch.on( 'click', $.proxy(this._handleSubmitSearch, this) );

    this.$getRandomBook.on( 'click', $.proxy(this._handleGetRandomBook, this) );

    this.$getAuthors.on( 'click', $.proxy(this._handleGetAuthors, this) );

    this.$deleteAuth.on('click', $.proxy(this._handleDeleteAuth, this) );

    this.$moreBooks2Add.on('click', $.proxy(this._handleMoreBooks2Add, this) );

    this.$addBookSubmit.on('click', $.proxy(this._handleAddBookSubmit, this) );

    this.$deleteFromTable.on('click', '#delete', $.proxy(this._handleDeleteFromTable, this) );
  }
  //************
  //HANDLERS
  //Search Library
  _handleSubmitSearch () {
    let userSearched = $( '#searchLib' ).val();
    let results = this.searchLibrary( userSearched );
    $('#newBookModule h3').text('Search Results');
    this.showUserInput(results);
    this.makeTable();
    return true;
  }
  //Get and show Random Book getRandomBook
  _handleGetRandomBook () {
    let results = this.getRandomBook();
    $('#newBookModule h3').text('Book Shuffle');
    this.showUserInput(results);
    return true;
  }
  //Get and show Authors, from .getAuthors returned array of strings
  _handleGetAuthors () {
    let results = this.getAuthors();
    $('#newBookModule h3').text('Authors in Library');
    $(results).each( ( index, element ) =>
      $('#newBookModule #bookAuthor').after( element + "--------") );
    return true;
  }
  //deletes from gLib.bookList, must be full match
  _handleDeleteAuth () {
    let deleteByAuth = $('#deleteAuthInput').val();
    this.removeBookByAuthor(deleteByAuth);
    $("#orgTable tbody tr").remove();
    this.makeTable();
    return true;
  }
  //Inputs
  //Add more than one book
  _handleMoreBooks2Add (event) {
    event.preventDefault();
    this.userInputValues();
    return true;
  }
  //Modal, save changes
  _handleAddBookSubmit () {
    event.preventDefault();
    this.userInputValues();
    this.addBooks( this.tempArray );
    return true;
  }
  //Delete from table by Clicking X and remove from library
  _handleDeleteFromTable (e) {
    event.preventDefault();
    let $tr = $(e.currentTarget).parent("tr");
    let getTitle = $(e.currentTarget).siblings(".getTitle").text();
    this.removeBookByTitle(getTitle);//implements local storage
    $tr.remove();
    return true;
  }
  //**************
  //TABLE F(x)'s
  //...F(x)'s from previous CL requirments and .handlers assist f(x)'s'
  //Add a New Book to the Library
  addBook ( book ) {
    console.log(book);
    for( let i = 0; i < this.bookList.length; i++){
      if( book.title === this.bookList[i].title ){
        $('#bookTitle').text('Book cannot be added, it is already in Library.')
        return false; //If added return false
      }
    }
    this.bookList.push( book );
    this.storeLocal();
    return true;
  }
  //addBooks(books)Purpose: Takes multiple books, in the form of an array of book objects, and adds the objects to your books array, not used at the moment
  addBooks ( array ) {
    let count=0
    for(let i = 0; i< array.length; i++){
      if(this.addBook(array[i])){
        count++;
      }
    }
    return count;
  }
  //Remove Book By title
  removeBookByTitle ( title ) {
    for( let i = this.bookList.length - 1 ; i >= 0; i--){
        if( title.toLowerCase() === this.bookList[i].title.toLowerCase() ){
          this.bookList.splice( i, 1 );//remove matched book
          this.storeLocal();
          return true;
        }
      }
    return false;//No match
  }
  //Remove Book By authorName
  removeBookByAuthor ( authorName ) {
    for( let i = this.bookList.length - 1 ; i >= 0; i--){
        if( authorName.toLowerCase() === this.bookList[i].author.toLowerCase() ){
          this.bookList.splice( i, 1 );//remove matched book
          this.storeLocal();
          return true;
        }
      }
    return false;//No match
  }
  //Get Random Book and Return, otherwise return null
  getRandomBook () {
    if(this.bookList === []){
      return null
    } else {
      randomIndex = Math.floor( Math.random() * this.bookList.length ) ;
      return this.bookList[ randomIndex ];
    }
  }
  //Get Book by Title, return all that match title whole/partially
  getBookByTitle ( title ) {
    let matched = [];
    for( let i = 0; i < this.bookList.length; i++) {
      //same as: authorInLibrary = /currentAuthor\;
      let titleRegEx = new RegExp(title, "i","g", "\S");
      if( titleRegEx.test(this.bookList[i].title) ) {
        matched.push( this.bookList[i] );
      }
    }
    return matched;
  }
  //Get Book by Title, return all that match title whole/partially
  getBooksByAuthor ( authorName ) {
    let matched = [];
    for( let i = 0; i < this.bookList.length; i++) {
      //same as: authorInLibrary = /currentAuthor\;
      let authorRegEx = new RegExp(authorName, "i", "g", "\S");
      if( authorRegEx.test(this.bookList[i].author) ) {
        matched.push( this.bookList[i] );
      }
    }
    return matched;
  }
  //getAuthors()Purpose: Find the distinct authors’ names from all books in your library. Return: array of strings the names of all distinct authors, empty array if no books exist or if no authors exist
  getAuthors () {
    let matched = [];
    for( let i = 1; i < this.bookList.length; i++) {
     //same as: authorInLibrary = /currentAuthor\;
     let authorRegEx = new RegExp(this.bookList[i].author, "i", "g", "\S");
     if( !authorRegEx.test(this.bookList[i-1].author) ) {
       matched.push( this.bookList[i].author );
     }
   }
   return matched;
  }
  //getRandomAuthorName()Purpose: Retrieves a random author name from your books collectionReturn: string author name, null if no books e
  getRandomAuthorName () {
    if(this.bookList === []){
      return null
    } else {
      randomIndex = Math.floor( Math.random()*this.bookList.length ) ;
      return this.bookList[ randomIndex ].author;
    }
  }
  // A more robust search function
  searchLibrary ( searchValue ){
    let matched = [];
    for( let i = 0; i < this.bookList.length; i++) {
      //same as: authorInLibrary = /currentAuthor\;
      let authorRegEx = new RegExp(searchValue, "i", "g", "\S");
      if( authorRegEx.test(this.bookList[i].author)||authorRegEx.test(this.bookList[i].title)||authorRegEx.test(this.bookList[i].numPages)||authorRegEx.test(this.bookList[i].pubDate) ) {
        matched.push( this.bookList[i] );
      }
    }
    return matched;
  }
  //.searchLib and .getRandomBook assist f(x) that displays results to user
  showUserInput ( results ) {
    $(results).each(( index, element ) => {
      $('#newBookModule #bookCover').attr( 'src', element.cover);
      $('#newBookModule #bookTitle').after( element.title + "--------");
      $('#newBookModule #bookAuthor').after( element.author + "--------");
      $('#newBookModule #bookNumPages').after( element.numPages + "--------");
      $('#newBookModule #bookPubDate').after( element.pubDate + "--------");
    });
  }
  //CREATE A NEW BOOK F(x)
  newBook ( cover, title, author, numPages, pubDate ) {
    let bookCreated = new Book( cover, title, author, numPages, pubDate);
    this.addBook(bookCreated);
    return true;
  }
  //Gets user input values to enter into gLib.bookList array and simultaneously display books by calling display Added
  userInputValues () {
    //get user values
    let cover = $("#coverInput").val();
    let title = $("#titleInput").val();
    let author = $("#authorInput").val();
    let numPages = $("#numPagesInput").val();
    let pubDate = $("#pubDateInput").val();
    if(!cover || !title || !author || !numPages || !pubDate){
      $('#addBooksFooter').text('Enter All Fields');
      return false;
    }
    //clear input
    $('#coverInput, #titleInput, #authorInput, #numPagesInput, #pubDateInput').val("");
    //add book to queue array
    this.addBookQ( cover, title, author, numPages, pubDate);
  }
  //get .userInputValues and add them to the book queue array, display added books
  //and tells user how many books they have added so far.
  addBookQ (cover, title, author, numPages, pubDate) {
    //Inside queue, create a book on each click
    let bookCreated = new Book( cover, title, author, numPages, pubDate );
    this.tempArray.push( bookCreated );

    //display # of books added to user in modal
    $('#addBooksFooter').text('You have added: ' + this.tempArray.length + ' book(s).');
    return this.tempArray;
    this.displayAdded( cover, title, author, numPages, pubDate );
    this.storeLocal();
  }
  //Display Book attribute in card above table
  displayAdded ( cover1, title1, author1, numPages1, pubDate1 ) {
    $('#bookCover').attr('src', cover1);
    document.getElementById("bookTitle").innerHTML = "Title : " + title1;
    document.getElementById("bookAuthor").innerHTML = "Author : " + author1;
    document.getElementById("bookNumPages").innerHTML = "Total Pgs : " + numPages1;
    document.getElementById("bookPubDate").innerHTML = "Publication Date : " + pubDate1;
    this.makeTable(cover1, title1, author1, numPages1, pubDate1);
    return true;
  }
  //*******Not using at the moment as Client requested a table for proof of concept
  //displays the books in the library to user as cards
  populateUiLibrary () {
    let currentData= [];
    for(let i = 0; i < this.bookList.length; i++) {
        currentData=  this.bookList[i].title + " " +
                      this.bookList[i].author + " " +
                      this.bookList[i].numPages + " " +
                      this.bookList[i].pubDate;

  // Cards that populateUILib
        // $('table tr').append("<td><div class='card bg-transparent'><div class='card-body bg-dark'> " + currentData + "</div></div></td>");
    };
  }
  //displays the books in the library table RENDERS ROWS
  makeTable ( cover1, title1, author1, numPages1, pubDate1 ) {
    this.addRow();
  }
  //Build table rows, .makeTable assist f(x)
  addRow () {
    $('#orgTable tr').remove();
    let currentData;
    for(let i = 0; i < this.bookList.length; i++) {
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
  }
  //Preset Books so Library isn't empty on load
  presetBooks () {
    let gIT = new Book("assets/readingBook.jpg", "IT", "Stephen King", 800, 'December 17, 1995 03:24:00');
    let gCatcherIntheRye = new Book("assets/readingBook.jpg", "Catcher In The Rye", "JD Salinger", 200, 'December 25, 1987 03:24:00');
    let gCatInTheHat = new Book("assets/readingBook.jpg", "Cat In The Hat", "Dr.Sues", 20, 'December 17, 1995 03:24:00' );
    let book1 = new Book("assets/readingBook.jpg", "one", "Stephen King", 3, 'December 17, 1995 03:24:00');
    let quixote= new Book("assets/readingBook.jpg", "Don Quixote", "Miguel de Cervantes Saavedra", 234, 'Dec 31, 1999');
    let q= new Book("assets/readingBook.jpg", "Don te", "Miguel vantesra", 23, 'Dec 1, 1999');
    let q1= new Book("assets/readingBook.jpg", "Don te1", "Miguel11 vantesra", 213, 'Dec 111, 1999');
    let bookArray = [quixote, q, q1];
    //Books added to Array for testing for faster testing
    this.addBook( gIT );
    this.addBook( gCatcherIntheRye );
    this.addBook( gCatInTheHat );
    this.addBook( book1 );
  }
  //Local Storage set f(x)
  storeLocal () {
    let storeBookList = JSON.stringify( this.bookList );
    return window.localStorage.setItem(this.instance, storeBookList);
  }
  //Local Storage get f(x)
  getLocal () {
    // Retrieve the object from storage
    let retrievedObject = JSON.parse(window.localStorage.getItem(this.instance));
    this.bookList = retrievedObject;
    return retrievedObject;
  }
};//End Library Class
//Book Object Constructor
class Book{
  constructor (cover, title, author, numPages, pubDate) {
  this.cover = cover;
  this.title = title;
  this.author = author;
  this.numbPages = numPages;
  this.pubDate = new Date(pubDate);
  //  this.isbn = isbn;
  }
};
//*********************//
//Doc.Ready
$(document).ready( () => {
  //initialize Library
  let gLib = new Library("gLib");
  gLib.makeTable();
  gLib.init();
  //local localStorage
  gLib.storeLocal();
  //GOOGLE BOOKS API
  google.books.load();
  function initialize () {
    let viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    viewer.load('ISBN:0521093597');
  }

  google.books.setOnLoadCallback(initialize);
});//End Doc.Ready
