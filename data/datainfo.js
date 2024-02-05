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
      const results = data.data;
      $('#animeCover').attr('src', results.images.webp.large_image_url);
      $('#anime-title').text(results.title_english);
      $('#anime-title-romaji').text(results.title);
    })
    .catch(error => {
      console.log(error);
    });
   
});
