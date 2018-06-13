var TwoFer = function () {};

TwoFer.prototype.twoFer = function (who) {
  // your code goes here
  // You will have to use the parameter who
  // in some way. In this example, it is just
  // returned, but your solution will have to
  // use a conditional.

  if(who==null){
    return 'One for you, one for me.' ;
  }

  else if (who == 'Alice'|| who=='Bob') {
   return 'One for ' + who + ', one for me.';
 } 
  return who;
};

module.exports = TwoFer;
