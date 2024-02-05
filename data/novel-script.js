$(document).ready(function () {
    for (let shimmer = 0; shimmer < 10; shimmer++) {
        const li = "<li class='shimmer'></li>";
        $("#topAiring").append(li);
        $("#seasonal").append(li);
        $("#latestEpisode").append(li);
    }

    fetch("../data/routes/anime.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            return response.json();
        })
        .then(data => {
            const results = data.data;
            $("#latestEpisode").empty();
            results.forEach(items => {
                const item =
                    `<li class='item' data-src='/data/page.html?id=`+items.malId+`'>
                       <div class='item-cover'>
                          <img src='` +
                    items.cover +
                    `' alt='Cover' loading='lazy'/>
                          <span id='score'><i class="fa-regular fa-face-smile"></i> ` +
                    items.score +
                    `%</span>
                          <span id='caption'><i class="fa-solid fa-closed-captioning"></i> ` +
                    items.currentEpisode +
                    `</span>
                       </div>
                       <p id='item-title'>` +
                    items.title.romaji +
                    `</p>
                    </li>`;
                $("#latestEpisode").append(item);
            });
            //Sort by airing
            const sortByAiring = results.sort((a, b) => {
                // Sort by popularity in descending order
                if (b.year !== a.year) {
                    return b.year - a.year;
                }
                // If popularity is the same, sort by year in ascending order
                return b.popularity - a.popularity;
            });
            $("#topAiring").empty();
            sortByAiring.forEach(items => {
                let status;
                if(items.status == "Releasing"){
                  status = '<i class="fa-solid fa-clock"></i>';
                }else{
                  status = '<i class="fa-solid fa-check"></i>';
                }
                const item =
                    `<li class='item' data-src=''>
                       <div class='item-cover'>
                          <img src='` +
                    items.cover +
                    `' alt='Cover' loading='lazy'/>
                         <span id='score'><i class="fa-regular fa-face-smile"></i> ` +
                    items.score +
                    `%</span>
                          <span id='caption'>`+status+` ` +
                    items.status +
                    `</span>
                       </div>
                       <p id='item-title'>` +
                    items.title.romaji +
                    `</p>
                    </li>`;
                $("#topAiring").append(item);
            });
            //Sort by popularity
            const sortByPopularity = results.sort((a, b) => b.popularity - a.popularity);
            $("#topPopularity").empty();
            sortByPopularity.forEach(items => {
                const item =
                    `<li class='item' data-src=''>
                      <img src='` +
                    items.cover +
                    `' alt='Cover' loading='lazy'/>
                       <div class='info'>
                          <p id='item-title'>` +
                    items.title.romaji +
                    `</p>
                         <p><i class="fa-regular fa-face-smile"></i> ` +
                    items.score +
                    `%</p>
                          <p><i class="fa-solid fa-tv"></i> ` +
                    items.format +
                    `</p>
                       </div>
                       
                    </li>`;
                $("#topPopularity").append(item);
            });
            
            const loadMore = `<li class='viewmore'><span>View More</span></li>`;
            $("#latestEpisode li:last").after(loadMore);
            $("#topAiring li:last").after(loadMore);
        })
        .catch(error => {
            console.log(error);
        });
});
