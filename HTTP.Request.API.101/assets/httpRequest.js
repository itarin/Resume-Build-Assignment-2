//country,state, location get from request
//API key: 334b5e73304273452557536a49276852
class meetUp {
  constructor () {
    this.$submitButton = $('#submit');
    this.refreshDataUrl = "https://api.meetup.com/2/cities";
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
                key: "334b5e73304273452557536a49276852",
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
    if (response) {
      //update data points
      $(response.results).each(( i, element ) => {
        console.log(response.results[i]);
        $('#showResults').append(
         '<div class="card bg-dark text-light border-0" style="min-width: 18rem;">' +
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
  window.meetUp = new meetUp();
  window.meetUp.init();
});//End Doc.Ready
