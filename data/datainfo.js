$(document).ready(function () {
    function getQueryParam(key) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
    }
    const novelId = getQueryParam("id");
    
    $.ajax({
      url: 'https://consumetmyapi.vercel.app/'
    });
});
