var Cipher = function ( key ) {
  // If a character is not lowerCase or empty throw error
  for( let i = 0; i < key.length; i++){
    if( !key[i] || typeof key[i] != "string" || key[i] = key.toUpperCase ){
      throw new Error('Bad key');
    }
  }

  this.key = key;
};

Cipher.prototype.key = function (key){
  //generate key if no key provided
  if(!key) {
    let key = [ ];
    let str = "ABC";
    for( let i = 0; i < 100; i++) {

      key.push( String.fromCodePoint( i%25 + 65) );

    };
    let keyMade = key.join("");
    return keyMade;
  }

}

Cipher.prototype.encode = function() {

}

module.exports = Cipher;
