$(document).ready(function(){
  const urlParams = new URLSearchParams(window.location.search);
  const path = '../path/data.json';
  const id = urlParams.get('id');
  
  async function getDataById(api, id){
    try{
      
      const response = await fetch(api);
      const data = await response.json();
     // console.log(data);
      const result = getResponse(data, id);
      if(result){
        
        $('.hero-container').css('background-image','url("'+result.images.banner+'")');
        $('.main-page').css('background-color', result.color);
        $('#page-cover').attr('src', result.images.cover);
        $('#page-title').text(result.title);
        $('#page-status').html('<span style="font-weight: 800">Status:</span> '+result.status);
        $('#page-type').html('<span style="font-weight: 800">Type:</span> '+result.type);
        $('#page-author').html('<span style="font-weight: 800">Author:</span> '+result.author);
        $('#page-artist').html('<span style="font-weight: 800">Artist:</span> '+result.artist);
        $('#page-synopsis').html(result.synopsis)
        $('#page-translation').text(result.translation);
        
        const genresList = result.genres;
        genresList.forEach(gen => {
          const genre = '<li>'+gen+'</li>';
          $('#page-genres').append(genre);
        });
        
        const volumesList = result.volumes;
        volumesList.forEach(items => {
          const item = `
            <li>
             <a href='${items.link}' target='_blanl'>
              <img src='${items.cover}' alt='Cover' loading='lazy'/>
             </a>
             <span>${items.name}</span>
            </li>
          `;
          $('#volume-list').append(item);
        });
        
      }else{
       console.log("No data found");
      }
      
    }catch(error){
      console.log(error);
    }
  }
  
  function getResponse(data, id){
    return data.find(item => item.id === id);
  }
  
  getDataById(path, id);
  
});