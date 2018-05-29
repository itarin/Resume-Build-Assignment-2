//Book Object Constructor
class Book{
  constructor (cover, title, author, numPages, pubDate, id) {
  this.cover = cover;
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.pubDate = new Date(pubDate).toLocaleDateString("en-us", { year: "numeric"});
  this._id =  id;
  }
};
//Library Constructor and Main Obj Creation
class Library {
  constructor(instance) {
    this.bookList = [];
    // local storage key
    this.instance = instance;
    this.refreshLibURL = "http://localhost:3000/library/";
  }
  //************
  // Architecture

  // Initialize preset books, load table, init sort f(x),
  // jQuery selectors, and call binds
  init () {
    this.tempArray = [];
    //this.presetBooks(); formerly used in static
    this.makeTable();

    // Initializing Jquery Selectors
    this.$orgTable = $('#orgTable');
    this.$orgTableRows = $('#orgTable tr');
    this.$submitSearch = $('#submitSearch');
    this.$getRandomBook = $('#getRandomBook');
    this.$getAuthors = $('#getAuthors');
    this.$deleteAuthMenuBttn = $('#deleteAuthor');
    this.$deleteAuth = $('#deleteAuth'); //delete author submit button
    this.$moreBooks2Add = $('#moreBooks2Add');
    this.$addBookSubmit = $('#addBookSubmit');
    this.$deleteFromTable = $('#orgTable');
    // User Input selectors
    this.$coverInput = $('#coverInput');
    this.$titleInput = $('#titleInput');
    this.$authorInput = $('#authorInput');
    this.$numPagesInput = $('#numPagesInput');
    this.$pubDateInput = $('#pubDateInput');

    this._bindEvents();
    this._refreshLibrary();

  }
  //LIBRARY BINDS
  _bindEvents () {
    //make content editable
    this.$orgTable.attr('contenteditable', 'true');

    this.$orgTableRows.on('focusout', this._handlePut(event) );

    this.$submitSearch.on( 'click', $.proxy(this._handleSubmitSearch, this) );

    this.$getRandomBook.on( 'click', $.proxy(this._handleGetRandomBook, this) );

    this.$getAuthors.on( 'click', $.proxy(this._handleGetAuthors, this) );

    this.$deleteAuthMenuBttn.on('click', $.proxy(this._handleDeleteAuthMenuBttn, this) );

    this.$deleteAuth.on('click', $.proxy(this._handleDeleteAuth, this) );

    this.$moreBooks2Add.on('click', $.proxy(this._handleMoreBooks2Add, this) );

    this.$addBookSubmit.on('click', $.proxy(this._handleAddBookSubmit, this) );

    this.$deleteFromTable.on('click', '#delete', $.proxy(this._handleDeleteFromTable, this) );
  }
  //************
  //HANDLERS
  //Search Library
  _handlePut (event) {
    //_putBookVals(e);
    console.log(  "clicked: " + this );

  //  console.log(  "clicked: " + $(this).val() );
  }
  _handleSubmitSearch (event) {
    event.preventDefault();
    let userSearched = $( '#searchLib' ).val();
    let results = this.searchLibrary( userSearched );
    $('#userDisplay, #userDisplayHeading').toggle();
    $('#userDisplayHeading').text('Search Results');
    this.showUserInput(results);
    this.makeTable();
    return true;
  }
  //Get and show Random Book getRandomBook
  _handleGetRandomBook () {
    this._randomBookLib();
    //Change display heading to reflect random authors
    $('#userDisplay').toggle().html('<p class="text-light">Random Book Generator</p>');
    $('#userDisplayHeading').toggle().text('Book Shuffle');
    $('#newBookModule').toggle();

    return true;
  }
  //Get and show Authors, from .getAuthors returned array of strings
  //******
  _handleGetAuthors (element) {
    let results = this.getAuthors();

    let authorIcon ="<i class='far fa-user'></i> " + " ";
    $('#userDisplayHeading').toggle().text('Authors in Library');
    $('#userDisplay').toggle();
    $('#newBookModule').empty();
    $(results).each( (index, element ) => $('#newBookModule').append('<h4 class="card-title text-light bg-dark text-center">'+authorIcon+element+'</h4>') );
    return true;
  }
  //displays the delete author input and submitSearch
  _handleDeleteAuthMenuBttn (){
    $('.form-inline.hide').toggle();
  }
  //deletes from gLib.bookList, must be full match
  _handleDeleteAuth () {
    let deleteByAuth = $('#deleteAuthInput').val();
    this.removeBookByAuthor(deleteByAuth);
    $("#orgTable tbody tr").remove();
    this.makeTable();
    return true;
  }
  //Add more than one book
  _handleMoreBooks2Add () {
    //event.preventDefault();
    this._postLibrary();
    //this.userInputValues();
    return true;
  }
  //Modal, save changes
  _handleAddBookSubmit () {
    //event.preventDefault();
    this._postLibrary();
    //this.userInputValues();
    this.addBooks( this.tempArray );
    return true;
  }
  //Delete from table by Clicking X and remove from library
  _handleDeleteFromTable (e) {
    e.preventDefault();
    let $tr = $(e.currentTarget).parent("tr");
    let getTitle = $(e.currentTarget).siblings(".getTitle").text();
    this.removeBookByTitle(getTitle);//implements local storage
    $tr.remove();
    return true;
  }
  //**********************AJAX functions*************
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  //AJAX funcitons in this section, parameters bellow in next section
  _refreshLibrary () {
    $.ajax( this._getLibParams() ).done( $.proxy(this._refreshLibSuccess, this) ).fail($.proxy(this._refreshFail, this) );
  }
  _deleteItem (book) {
    $.ajax( this._deleteItemParams(book) ).fail( $.proxy(this._refreshFail, this) );
  }
  _postLibrary () {
    $.ajax( this._postLibParams() ).done( $.proxy(this._postLibSuccess, this) ).fail($.proxy(this._refreshFail, this) );
  }

  _randomBookLib () {
    $.ajax( this._getLibParams() ).done( $.proxy(this._randomLibSuccess, this) ).fail($.proxy(this._refreshFail, this) );
  }
  // _putBookVals (book) {
  //   $.ajax( this._putParams(book) ).done( $.proxy(this._postLibSuccess, this) ).fail($.proxy(this._refreshFail, this) );
  // }
  //ajax call parameters
  _getLibParams () {

    return {
      dataType: 'json',
      type: 'GET',
      url: this.refreshLibURL,
    }

  }
  _postLibParams () {

    return {
      dataType: "json",
      method: "POST",
      url: this.refreshLibURL,
      data: {
        cover: this.$coverInput.val(),
        title: this.$titleInput.val(),
        author: this.$authorInput.val(),
        numPages: this.$numPagesInput.val()
      }
    }

  }
  _deleteItemParams (book) {
    let bookId = book._id;

    return {
      dataType: 'json',
      type: 'DELETE',
      url: this.refreshLibURL+bookId,
      data: {
        _id: bookId
      }
    }

  }
  // _putParams (book) {
  //   let bookId = book._id;
  //
  //   return {
  //     dataType: 'json',
  //     type: 'PUT',
  //     url: this.refreshLibURL+bookId,
  //     data: {
  //       // cover: this.$coverInput.val(),
  //       // title: this.$titleInput.val(),
  //       // author: this.$authorInput.val(),
  //       // numPages: this.$numPagesInput.val(),
  //       _id: bookId
  //     }
  //   }
  //
  // }

  // AJAX callback response/fails
  _postLibSuccess () {
    console.log('success')
  }
  _randomLibSuccess (response) {
    if (response) {
      this.getRandomBook(response);
    }
  }
  _refreshLibSuccess (response) {
    if (response){
      this.addBooks(response);
      this.makeTable();
    }
  }
  _refreshFail () {
    console.log( "failed to retreive data");
  }
  //**************
  //TABLE F(x)'s
  //...F(x)'s from previous CL requirments and .handlers assist f(x)'s'
  //addBooks(books)Purpose: Takes multiple books, in the form of an array of book objects, and adds the objects to your books array, not used at the moment
  addBooks ( array ) {
    let booksAdded=0
    for(let i = 0; i< array.length; i++){
      if(this.addBook(array[i])){
        booksAdded++;
      }
    }
    return booksAdded;
  }
  //Add a New Book to the Library
  addBook ( book ) {
    for( let i = 0; i < this.bookList.length; i++){
      if( book.title === this.bookList[i].title ){
        $('#bookTitle').text('Book cannot be added, it is already in Library.')
        return false; //If added return false
      }
    }
    this.bookList.push( book );
    //this.storeLocal();
    return true;
  }

  //Remove Book By title
  removeBookByTitle ( title ) {
    for( let i = this.bookList.length - 1 ; i >= 0; i--){
        if( title.toLowerCase() === this.bookList[i].title.toLowerCase() ){
          this._deleteItem( this.bookList[i]);
          this.bookList.splice( i, 1 );//remove matched book
          this.storeLocal();
          return true;
        }
      }
    return false;//No match
  }
  //Remove Book By authorName
  removeBookByAuthor ( book ) {
    this._deleteItem(book);
    for( let i = this.bookList.length - 1 ; i >= 0; i--){
        if( book.authorName.toLowerCase() === this.bookList[i].author.toLowerCase() ){
          this.bookList.splice( i, 1 );//remove matched book
          this.storeLocal();
          return true;
        }
      }
    return false;//No match
  }
  //Get Random Book and Return, otherwise return null
  getRandomBook (array) {
    var randomIndex;
    if(array === []){
      return null
    } else {
      randomIndex = Math.floor( Math.random() * array.length ) ;
      let result= array[ randomIndex ];

      $('#userDisplay').append(
         '<div class="card bg-dark text-light border-0" style="min-width: 18rem;">' +
            '<img class="card-img-top img-thumbnail w-25 p-0" src="' +`${result.cover}`+ ' " alt="Card image cap">' +
           '<div class="card-body bg-dark">' +
             '<h5 class="card-title text-center">'+`${result.title}`+'</h5>'+
             '<p class="card-text">'+ `Author : ${result.author}`+  '</p>'+
             '<p class="card-text">'+ `Total Pages : ${result.numPages}`+  '</p>'+
             '<p class="card-text">'+ `Published  : ${result.pubDate}`+  '</p>'+
           '</div>'+
        '</div>'
      );

    }
  }
  //Library Functions
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
  //Get Book by Author, return all that match title whole/partially
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
       console.log(this.bookList[i].author);
     }
   }
   return matched;
  }
  //getRandomAuthorName()Purpose: Retrieves a random author name from your books collectionReturn: string author name, null if no books e
  getRandomAuthorName () {
    if(this.bookList === []){
      return null
    } else {
      randomIndex = Math.floor( Math.random()*this.bookList.length );
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
  //displays the books in the library table RENDERS ROWS
  makeTable ( ) {
    this.addRow();
  }
  //Build table rows, .makeTable assist f(x)
  addRow () {
    $('#orgTable tr td').remove();
    let currentData;
    for(let i = 0; i < this.bookList.length; i++) {
        currentData =
        "<tr class='flex-wrap align-content-between' data-id ='" + this.bookList[i]._id + "'>" +
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
  //Gets user input values to enter into gLib.bookList array and simultaneously display books by calling display Added
  userInputValues () {

    //get user values
    let cover = this.$coverInput.val();
    let title = this.$titleInput.val();
    let author = this.$authorInput.val();
    let numPages = this.$numPagesInput.val();
    let pubDate = this.$pubDateInput.val();
    if(!cover || !title || !author || !numPages || !pubDate){
      $('#addBooksFooter').text('Enter All Fields');
      return false;
    }
    //clear input
    $('#coverInput, #titleInput, #authorInput, #numPagesInput, #pubDateInput').val("");
    //add book to queue array
    this.addBookQ( cover, title, author, numPages, pubDate);
  }
  //.searchLib and .getRandomBook assist f(x) that displays results to user
  showUserInput ( results ) {
    $(results).each(( index, element ) => {
      $('#newBookModule').append(
         '<div class="card bg-dark text-light border-0" style="min-width: 18rem;">' +
            '<img class="card-img-top img-thumbnail mw-75 p-0" src="' +`${element.cover}`+ ' " alt="Card image cap">' +
           '<div class="card-body bg-dark">' +
             '<h5 class="card-title text-center">'+`${element.title}`+'</h5>'+
             '<p class="card-text">'+ `Author : ${element.author}`+  '</p>'+
             '<p class="card-text">'+ `Total Pages : ${element.numPages}`+  '</p>'+
             '<p class="card-text">'+ `Published  : ${element.pubDate}`+  '</p>'+
           '</div>'+
        '</div>'
      );
    });
  }
  //CREATE A NEW BOOK F(x)
  newBook ( cover, title, author, numPages, pubDate ) {
    let bookCreated = new Book( cover, title, author, numPages, pubDate);
    this.addBook(bookCreated);
    return true;
  }

  //get .userInputValues and add them to the book queue array, display added books
  //and tells user how many books they have added so far.
  addBookQ (cover, title, author, numPages, pubDate) {
    //Inside queue, create a book on each click
    let bookCreated = new Book( cover, title, author, numPages, pubDate );
    this.tempArray.push( bookCreated );

    //display # of books added to user in modal
    $('#addBooksFooter').text('You have added: ' + this.tempArray.length + ' book(s).');
    this.addBooks(this.tempArray)
    //this.displayAdded( cover, title, author, numPages, pubDate );
    //this.storeLocal(); will store added books to book array
    return this.tempArray;
  }

};//End Library Class



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
