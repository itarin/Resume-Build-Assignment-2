//country,state, location get from request
//API key: 334b5e73304273452557536a49276852
class meetUp {
  constructor () {
    this.key = "334b5e73304273452557536a49276852";
    this.$submitButton = $('#submit');
    this.refreshDataUrl = "https://api.meetup.com/2/cities";
    this.places = [];
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
    console.log("outside"+this.places);

    if (response) {
      //update data points
      $(response.results).each(( i, element ) => {
        //capture lattitude and longitude for googleMaps API
        this.places.push({lat:response.results[i].lat, lng: response.results[i].lon});
        $('#showResults').append(
         '<div class="card bg-dark text-light border-0" style="max-width: 18rem;">' +
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
        );//.append
      });//.each
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
console.log(gmeetUp.places);
//Google Maps Api Call Back F(x)
function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
