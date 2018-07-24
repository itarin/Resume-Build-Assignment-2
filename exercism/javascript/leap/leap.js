//
// This is only a SKELETON file for the "Leap" exercise. It's been provided as a
// convenience to get you started writing code faster.
// is Leap yr: on every year that is evenly divisible by 4
// is not Leap year: except every year that is evenly divisible by 100
// is a Leap year: the year is also evenly divisible by 400


var Year = function (yr) {
//
// YOUR CODE GOES HERE
  this.year = yr;
};

Year.prototype.isLeap = function () {
// YOUR CODE GOES HERE
// Is a leap year:: yr%4 == 0 && yr%100!=0
//Is a leap year::  yr%400==0 && yr%100
//Is not leap year:: yr%100==0
  if( (this.year%4 == 0 && this.year%100 != 0)|| (this.year%100 == 0 && this.year%400 == 0)){
    return true;
  }
  return false;
};

module.exports = Year;
