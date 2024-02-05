$(document).ready(function () {
    function getQueryParam(key) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
    }
    const idParam = getQueryParam("id");
    let params = 'https://consumetmyapi.vercel.app/meta/mal/info/'+idParam;
    
    fetch(params)
    .then(response => {
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      return response.json();
    })
    .then(data => {
      const results = data;
      $('#animeCover').attr('src', results.image);
      $('#anime-title').text(results.title.english);
      $('#anime-title-romaji').text(results.title.romaji);
    })
    .catch(error => {
      console.log(error);
    });
   
});
