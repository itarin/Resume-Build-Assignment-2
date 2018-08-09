var ReverseString = function (stringInput) {
  // your code goes here
  if(!stringInput){return '';};
  var  holdCharacter= [];
  var  reversed;
  for( var i = stringInput.length; i >= 0; i--) {
    holdCharacter.push( stringInput.substr(i,1) );
    reversed = holdCharacter.join("");
  }
  return reversed;
};

module.exports = ReverseString;
