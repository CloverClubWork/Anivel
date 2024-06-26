$(document).ready(function() {
  const path = "https://cloverclubwork.github.io/Anivel/path/data.json";

  async function getDataNewRelease(api) {
    try {
      const response = await fetch(api);
      const data = await response.json();

      const randomBooks = getRandomAuthor(data);
      $("#randomBookAuthor").text("Books by " + randomBooks);
      const booksByAuthor = findBooksByAuthor(data, randomBooks);
      showListByAuthor(booksByAuthor);

      const listAllGenres = getAllGenres(data);

      $(".hero-container").css(
        "background-image",
        'url("' + data[0].images.banner + '")'
      );

      data.forEach((items, index) => {
        const position = index + 1;
        const item = `
           <li style='background-color:${items.color}'>
           <h3>${items.title}</h3>
            <div id='item-content'>
              <img src='${items.images.cover}' alt='Cover' loading='lazy'/>
              <div>
                <div>
                  <p>•New Released</p>
                  <h5>#${position}</h5>
                  <h5>Volume ${items.currentVolume}</h5>
                  <button id='showPage' data-src='pages.html?novel=${items.id}'>Read More</button>
                </div>
              </div>
            </div>
            <p>${items.synopsis}</p>
           </li>
        `;
        $("#item-list").append(item);
      });

      listAllGenres.forEach(items => {
        const item = `<li>${items}</li>`;
        $("#genreList").append(item);
      });

      $("#genreList li:first-child").addClass("selected-genre");
      let genreVal = $("#genreList li.selected-genre").text();
      getItemsByGenre(data, genreVal);
      $("#genreList li").click(function() {
        // Remove 'selected-genre' class from all li elements
        $("#genreList li").removeClass("selected-genre");

        // Add 'selected-genre' class to the clicked li element
        $(this).addClass("selected-genre");
        genreVal = $(this).text();
        getItemsByGenre(data, genreVal);
      });
    } catch (error) {
      console.log(error);
    }
  }
  getDataNewRelease(path);

  function getRandomAuthor(books) {
    // Get all unique authors
    const authors = [...new Set(books.map(book => book.author))];

    // Select a random author
    const randomAuthor =
      authors[Math.floor(Math.random() * authors.length)];

    return randomAuthor;
  }

  function findBooksByAuthor(books, authorName) {
    const results = books.filter(book => book.author === authorName);
    results.sort((a, b) => b.popularity - a.popularity);
    return results;
  }

  function getItemsByGenre(data, text) {
    $("#genreListItems").empty();
    const filteredGenre = data.filter(d => d.genres.includes(text));
    const results = filteredGenre.sort(
      (a, b) => b.popularity - a.popularity
    );
    results.forEach((items, index) => {
      const position = index + 1;
      const item = `
           <li data-src='pages.html?novel=${items.id}'>
             <img src='${items.images.cover}' alt='Cover' loading='lazy'/>
             <div>
               <span style='background-color:${items.color}'># ${position}</span>
             </div>
           </li>
        `;
      $("#genreListItems").append(item);
    });
  }

  function showListByAuthor(data) {
    data.forEach((items, index) => {
      const position = index + 1;
      const item = `
           <li data-src='pages.html?novel=${items.id}'>
             <img src='${items.images.cover}' alt='Cover' loading='lazy'/>
             <div>
               <span style='background-color:${items.color}'># ${position}</span>
             </div>
           </li>
        `;
      $("#booksByAuthorList").append(item);
    });
  }

  function getAllGenres(data) {
    const allGenres = data.flatMap(d => d.genres);
    // Remove duplicates
    const uniqueGenres = [...new Set(allGenres)];
    // Sort from A to Z
    const sorted = uniqueGenres.sort();
    return sorted;
  }

  $('#item-list').on('click', 'li div div button', function() {
    window.location.href = $(this).data('src');
  });
  $('#genreListItems').on('click', 'li', function() {
    window.location.href = $(this).data('src');
  });
  $('#booksByAuthorList').on('click', 'li', function() {
    window.location.href = $(this).data('src');
  });
});