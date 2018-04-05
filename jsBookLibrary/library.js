
//Library Constructor
var Library =  funciton(){};
//Book Object
var book = functino(title, author, numPages, pubDate){
  this.title = title;
  this.author = author;
  this.numberOfPages = numPages;
  this.publishDate = new Date(pubDate);
};
//Library instance
var gLib = new library();

//Book Instance
var gIT = new book("IT", "Stephen King", 800, 'December 17, 1995 03:24:00');
var gCatcherIntheRye = new book("Catcher In The Rye", "JD Salinger", 200, 'December 25, 1987 03:24:00');
