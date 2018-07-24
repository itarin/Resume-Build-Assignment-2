var DnaTranscriber = function() {};

DnaTranscriber.prototype.toRna = function( nucleotide ) {

  var convert = function ( nucleotide ) {

    nucleotide.toUpperCase();
    let transcribing = nucleotide.split('');
    let  transcription = [ ];
    let _throw = (m) => { throw new Error(m); }
    transcribing.map( (e) => {
      e === 'G' ? transcription.push( 'C' )
       : e === 'C' ? transcription.push( 'G' )
       : e === 'T' ? transcription.push( 'A' )
       : e === 'A' ? transcription.push( 'U' )
       : _throw('Invalid input')
    });
      return transcription.join('') ;
  }
  return convert( nucleotide );

};

module.exports = DnaTranscriber;
