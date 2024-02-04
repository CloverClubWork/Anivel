$(document).ready(()=>{
  
  //Click items
  $('#latestEpisode').on('click', 'li', function(){
    window.location.href = $(this).attr('data-src');
  });
  
});