//country,state, location get from request
//API key: 334b5e73304273452557536a49276852
class meetUp {
  constructor () {
    this.$submitButton = $('#submit');
    this.refreshDataUrl = "https://api.meetup.com/2/cities?key=334b5e73304273452557536a49276852";
  }
  //*******Architecture
  init () {
    this.bindEvents();
  }
  bindEvents () {
    this.$submitButton.on('click', $.proxy(this.refreshData, this));
  }
  // requestObject () {
  //   {
  //     dataType: 'jsonp',
  //     type:"GET",
  //     url: this.refreshDataUrl,
  //     data: {
  //       country: "US",
  //       state: "CO",
  //       page: "20"
  //     }
  //   }
  // }
  refreshData () {
    event.preventDefault();
    console.log("event : " + event);
    $.ajax({
        dataType: 'jsonp',
        type:"GET",
        url:"https://api.meetup.com/2/cities?key=334b5e73304273452557536a49276852",
        data: {country: "US", state: "ID", page: "20"}
      }).done(function(response){
        console.log(response);
      }).fail(function(){
        console.log("fail");
      })

  //   $.ajax(
  //     {
  //         dataType: 'jsonp',
  //         type:"GET",
  //         url: this.refreshDataUrl,
  //         data: {
  //           country: "US",
  //           state: "CO",
  //           page: "20"
  //         }
  //       }
  //     ).done($.proxy(this._refreshDataSuccess, this)).fail($.proxy(this._refreshDataFail, this));
  }//end refreshData

  //Success
  _refreshDataSuccess (response) {
    console.log("response :" +response);
    if (response) {
      //update data points
      $(response.results).each(( index, element ) => {
        $('#showResults').append(
         '<div class="card bg-dark text-light border-0" style="min-width: 18rem;">' +
           '<div class="card-body">' +
             '<p class="card-title">' +`City : ${this.results.city}`+'</p>'+
             '<p class="card-text">' + `Zip : ${this.results.zip}`+  '</p>'+
             '<p class="card-text">' + `State : ${this.results.state}`+  '</p>'+
             '<p class="card-text">' + `Country : ${this.results.country}`+  '</p>'+
             '<p class="card-text">' + `Ranking  : ${this.results.ranking}`+  '</p>'+
             '<p class="card-text">' + `Member Count : ${this.results.member_count}`+  '</p>'+
             '</div>'+
          '</div>'
        );//.append
      });//.each
    }//end if statment for the response
  }//end _refreshDataSuccess
  //fail
  _refreshDataFail () {
    console.log("fail");
  }
}//end class meetUp

$(document).ready( () => {
  window.meetUp = new meetUp();
  window.meetUp.init();
});//End Doc.Ready
