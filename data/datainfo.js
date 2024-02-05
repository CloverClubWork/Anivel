$(document).ready(function () {
    function getQueryParam(key) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
    }
    const idParam = getQueryParam("id");
    
    let url = 'https://consumetmyapi.vercel.app/meta/mal/info/'+idParam;
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: function(data){
        
      },
      error: function(error){
        console.log(error);
      }
    });
});
