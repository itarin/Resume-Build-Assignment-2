//country,state, location get from request
//API key: AIzaSyAOldbHH9qclwt4heyE9CdKIiFEEeUO9QI
class meetUp {
  constructor () {
    this.key = "334b5e73304273452557536a49276852";
    this.$submitButton = $('#submit');
    this.$localStoreButton = $('#localStoreButton');
    this.refreshDataUrl = "https://api.meetup.com/2/cities";
  }
  //*******Architecture
  init () {
    //clear resusts div
    $('#showResults').empty();
    this.bindEvents();
    this.useLocalData();
  }
  bindEvents () {
    this.$submitButton.on('click', $.proxy(this.refreshData, this));
    this.$localStoreButton.on('click', $.proxy(this.useLocalData, this));
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
  refreshData (event) {
    event.preventDefault();
    $.ajax( this.inputObject()
      ).done($.proxy(this._refreshDataSuccess, this)).fail($.proxy(this._refreshDataFail, this));
  }//end refreshData
  //HTTP request Success
  _refreshDataSuccess (response) {
    this.storeLocally(response);
    if (response) {
      //clear DIV before appending data
      $('#showResults').empty();
      //update data points
      $(response.results).each(( i, element ) => {
        $('#showResults').append(
         '<div class="card bg-dark text-dark border-0" style="max-width: 18rem;">' +
           '<iframe class="embed-responsive-item" id='+`"frame${i}"`+'></iframe>' +
           '<div class="card-body">' +
             '<ul class="list-group list-group-flush bg-dark">' +
                 '<li class="list-group-item card-title bg-dark"><i class="fas fa-building mr-1"></i>' +`City : ${response.results[i].city}`+'</li>'+
                 '<li class="list-group-item bg-dark"><i class="fas fa-map-signs mr-1"></i>' + `Zip : ${response.results[i].zip}` +  '</li>'+
                 '<li class="list-group-item bg-dark"><i class="fas fa-map mr-1"></i>' + `State : ${response.results[i].state}` +  '</li>'+
                 '<li class="list-group-item bg-dark"><i class="fas fa-globe mr-1"></i>' + `Country : ${response.results[i].country}`+  '</li>'+
                 '<li class="list-group-item bg-dark"><i class="fas fa-star mr-1"></i>' + `Ranking  : ${response.results[i].ranking}`+  '</li>'+
                 '<li class="list-group-item bg-dark"><i class="fas fa-users mr-1"></i>' + `Member Count : ${response.results[i].member_count}`+  '</li>'+
               '</ul>' +
             '</div>'+
          '</div>'
        );//.append the card
        var selectFrame = `#frame${i}`;
        var sauce = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAOldbHH9qclwt4heyE9CdKIiFEEeUO9QI&q=${response.results[i].city}&center=${response.results[i].lat},${response.results[i].lon}&zoom=10`;
        $(selectFrame).attr('width', '288');
        $(selectFrame).attr('height', '250');
        $(selectFrame).attr('style', 'border:0');
        $(selectFrame).attr('src', sauce);
      });//End.each
    }//end if statment for the response
  }//end _refreshDataSuccess
  //HTTP Fail
  _refreshDataFail () {
    console.log("fail");
  }
  useLocalData () {
    let response = this.getLocalStorage();
    this._refreshDataSuccess(response);
  }
  storeLocally (response) {
    var storedObj = JSON.stringify(response)
    return window.localStorage.setItem('response', storedObj);
  }
  getLocalStorage () {
    let response = JSON.parse( window.localStorage.getItem('response') );
    return response;
  }
}//end class meetUp
$(document).ready( () => {
  window.newMeetUp = new meetUp();
  window.newMeetUp.init();
});//End Doc.Ready
