$(document).ready(function () {
    function getQueryParam(key) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
    }
    const idParam = getQueryParam("id");
    console.log(idParam)
    let params = 'https://consumetmyapi.vercel.app/meta/mal/info/'+idParam;
    
    fetch(params)
    .then(response => {
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
   
});
