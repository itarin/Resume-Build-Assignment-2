//country,state, location get from request
//API key: AIzaSyAOldbHH9qclwt4heyE9CdKIiFEEeUO9QI
class meetUp {
  constructor () {
    this.key = "334b5e73304273452557536a49276852";
    this.$submitButton = $('#submit');
    this.refreshDataUrl = "https://api.meetup.com/2/cities";
    //temp array holds vals to prevent error from google API
    this.places =  [
                      {lat: -31.563910, lng: 147.154312},
                      {lat: -33.718234, lng: 150.363181},
                      {lat: -33.727111, lng: 150.371124}
                    ]
  }
  //*******Architecture
  init () {
    this.bindEvents();
  }
  bindEvents () {
    this.$submitButton.on('click', $.proxy(this.refreshData, this));
  }
  inputObject () {
    this.$countryInput = $('#countryInput').val();
    this.$stateInput = $('#stateInput').val();
    this.$numResultsInput = $('#numResultsInput').val();
    return {
              dataType: "jsonp",
              type:"GET",
              url: this.refreshDataUrl,
              data: {
                key: this.key,
                country: `${this.$countryInput}`,
                state: `${this.$stateInput}`,
                page: `${this.$numResultsInput}`
              }
          }
  }
  refreshData () {
    event.preventDefault();
    $.ajax( this.inputObject()
      ).done($.proxy(this._refreshDataSuccess, this)).fail($.proxy(this._refreshDataFail, this));
  }//end refreshData
  //HTTP request Success
  _refreshDataSuccess (response) {
    this.places = [];
    if (response) {
      //update data points
      $(response.results).each(( i, element ) => {
        //capture lattitude and longitude for googleMaps API
        this.places.push({lat:response.results[i].lat, lng: response.results[i].lon});
        $('#showResults').append(
         '<div class="card bg-dark text-light border-0" style="max-width: 18rem;">' +
           '<iframe id='+`"frame${i}"`+'></iframe>' +
           '<div class="card-body">' +
             '<ul class="list-group list-group-flush bg-dark">' +
                 '<li class="list-group-item card-title bg-dark">' +`City : ${response.results[i].city}`+'</li>'+
                 '<li class="list-group-item bg-dark">' + `Zip : ${response.results[i].zip}`+  '</li>'+
                 '<li class="list-group-item bg-dark">' + `State : ${response.results[i].state}`+  '</li>'+
                 '<li class="list-group-item bg-dark">' + `Country : ${response.results[i].country}`+  '</li>'+
                 '<li class="list-group-item bg-dark">' + `Ranking  : ${response.results[i].ranking}`+  '</li>'+
                 '<li class="list-group-item bg-dark">' + `Member Count : ${response.results[i].member_count}`+  '</li>'+
               '</ul>' +
             '</div>'+
          '</div>'
        );//.append the card
        var selectFrame = `#frame${i}`;
        var sauce = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAOldbHH9qclwt4heyE9CdKIiFEEeUO9QI&q=${response.results[i].city}&center=${response.results[i].lat},${response.results[i].lon}&zoom=8`;
        $(selectFrame).attr('width', '288');
        $(selectFrame).attr('height', '250');
        $(selectFrame).attr('framborder', '0');
        $(selectFrame).attr('style', 'border:0');
        $(selectFrame).attr('src', sauce);
      });//End.each
    }//end if statment for the response
  }//end _refreshDataSuccess
  //HTTP Fail
  _refreshDataFail () {
    console.log("fail");
  }
}//end class meetUp
$(document).ready( () => {
  window.newMeetUp = new meetUp();
  window.newMeetUp.init();
});//End Doc.Ready
