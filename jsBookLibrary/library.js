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
var Book = function(title, author, numPages, pubDate, isbn){
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
    document.getElementById("bookTitle").innerHTML = "Title : " + dataTitle;
    document.getElementById("bookAuthor").innerHTML = "Author : " + dataAuthor;
    document.getElementById("bookNumPages").innerHTML ="Total Pgs : " + dataNumPages;
    document.getElementById("bookPubDate").innerHTML = "Publication Date : " + dataPubDate;
    this.populateUiLibrary();
}

//User Interface to enter and simultaneously display books
Library.prototype.displayBook = function() {
  dataTitle = document.getElementById("titleInput").value;
  dataAuthor = document.getElementById("authorInput").value;
  dataNumPages = document.getElementById("numPagesInput").value;
  dataPubDate = $("pubDateInput").val();
  gLib.newBook(dataTitle, dataAuthor, dataNumPages, dataPubDate);

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
//displays the books in the library to user
Library.prototype.orgLibrary = function(){
  var currentData= [];
  for(var i = 0; i <this.bookList.length; i++){
      currentData =  "<tr class='flex-wrap align-content-between'>" +
                      "<td id='getTitle'>" + this.bookList[i].title + "</td>" +
                      "<td>" +  this.bookList[i].author + "</td>" +
                      "<td>" + this.bookList[i].numPages + "</td>" +
                      "<td>" + this.bookList[i].pubDate + "</td>" +
                      "<td id='delete'>" + "<i class='material-icons text-dark'>cancel</i>" + "</td>"
                    "</tr>";
      $('#orgTable').append( currentData );
  };
};
//Book Instance
var gIT = new Book("IT", "Stephen King", 800, 'December 17, 1995 03:24:00');
var gCatcherIntheRye = new Book("Catcher In The Rye", "JD Salinger", 200, 'December 25, 1987 03:24:00');
var gCatInTheHat = new Book("Cat In The Hat", "Dr.Sues", 20, 'December 17, 1995 03:24:00' );
var book1 = new Book("one", "Stephen King", 3, 'December 17, 1995 03:24:00');
var quixote= new Book("Don Quixote", "Miguel de Cervantes Saavedra", 234, 'Dec 31, 1999');
var q= new Book("Don te", "Miguel vantesra", 23, 'Dec 1, 1999');
var q1= new Book("Don te1", "Miguel11 vantesra", 213, 'Dec 111, 1999');
var bookArray = [quixote, q, q1];
//Books added to Array for testing for faster testing
gLib.addBook( gIT );
gLib.addBook( gCatcherIntheRye );
gLib.addBook( gCatInTheHat );
gLib.addBook( book1 );

$(document).ready(function(){
    gLib.orgLibrary();//Stor HERE ONLY FOR BUILD************************************
    //Menu F(x)'s
    $('#submitSearch').on( 'click', function(){
      var userSearched = $( '#searchLib' ).val();
      gLib.searchLibrary( userSearched );
    });

    //TABLE F(x)'s
    //Sort TABLE f(x)
    function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("orgTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  //Sort When Table Title Clicked
  $('#orgTable').on('click','#titleSort', function(){
    sortTable(0);
  });
  //Delete from table and remove from library
  $('tbody').on('click', '#delete', function(){
    $('#delete').parent().remove();
    var bTitle=$('#getTitle').text();
    gLib.removeBookByTitle(bTitles);
  });

  //INPUT UI F(x)'s
  //Display .addOne UI to ADD ONE Book
  $('#addOneBttn').on('click', function(){
    $('#addOne').removeClass('d-none');
  });
  //OnClick of Menu Display .addMore UI to ADD ONE Book
  $('#addMultBooksBttn').on('click', function(){
    event.preventDefault();
    $('#addOne').remove();
    $('#addMoreCopy').removeClass('d-none');
  });
  //OnClick of Menu Display .addMore UI to ADD ONE Book
  $('#moreBooks2Add').on('click', function(event){
    event.preventDefault();
    $('#addOne').remove();
    $('#addMoreCopy').removeClass('d-none');
    //if(#addMoreCopy){}
    var addMore = $('#addMoreCopy').clone().html();
    $('row parallax3').append(addMore);
  });
});
//GOOGLE BOOKS API
google.books.load();

function initialize() {
  var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
  viewer.load('ISBN:0521093597');
}

google.books.setOnLoadCallback(initialize);
