$(document).ready(function () {
    for (let shimmer = 0; shimmer < 10; shimmer++) {
        const li = "<li class='shimmer'></li>";
        $("#topAiring").append(li);
        $("#seasonal").append(li);
        $("#latestEpisode").append(li);
    }

    fetch('../data/routes/anime.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            return response.json();
        })
        .then(data => {
            const container = $("#latestEpisode");
            console.log(data);
            const results = data.data;
            container.empty();
            results.forEach(items => {
                const item =
                    `<li class='item' data-src=''>
                       <div class='item-cover'>
                          <img src='` +items.cover +`' alt='Cover' loading='lazy'/>
                       </div>
                       <p id='item-title'>` +items.title.romaji +`</p>
                    </li>`;
                container.append(item);
            });
            const loadMore = `<li class='viewmore'><span>View More</span></li>`;
            $("#latestEpisode li:last").after(loadMore);
        })
        .catch(error => {
            console.log(error);
        });

    fetch("https://api.jikan.moe/v4/seasons/now")
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            return response.json();
        })
        .then(data => {
            const container = $("#seasonal");
            const results = data.data;
            container.empty();
            results.forEach(items => {
                const item =
                    `
          <li class='item' data-src=''>
              <div class='item-cover'>
                <img src='` +
                    items.images.jpg.large_image_url +
                    `' alt='Cover' loading='lazy'/>
              </div>
              <p id='item-title'>` +
                    items.title +
                    `</p>
          </li>
        `;
                container.append(item);
            });
            const loadMore = `
        <li class='viewmore'>
           <span>View More</span>
        </li>
      `;
            $("#seasonal li:last").after(loadMore);
        })
        .catch(error => {
            console.log(error);
        });

    fetch("https://api.jikan.moe/v4/top/anime?filter=airing")
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            return response.json();
        })
        .then(data => {
            const container = $("#topAiring");
            const results = data.data;
            container.empty();
            results.forEach(items => {
                const item =
                    `
        <li class='item' data-src=''>
            <div class='item-cover'>
              <img src='` +
                    items.images.jpg.large_image_url +
                    `' alt='Cover' loading='lazy'/>
            </div>
            <p id='item-title'>` +
                    items.title +
                    `</p>
        </li>
      `;
                container.append(item);
            });
            const loadMore = `
            <li class='viewmore'>
               <span>View More</span>
            </li>
          `;
            $("#topAiring li:last").after(loadMore);
        })
        .catch(error => {
            console.log(error);
        });

    fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity")
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            return response.json();
        })
        .then(data => {
            const container = $("#topPopularity");
            const results = data.data;
            container.empty();
            results.forEach(items => {
                const item =
                    `
          <li class='item' data-src=''>
            <div>
              <img src='` +
                    items.images.jpg.image_url +
                    `' alt='Cover' loading='lazy'/>
            <div class='info'>
              <p>` +
                    items.title +
                    `</p>
              <p>` +
                    items.type +
                    `</p>
              <p>` +
                    items.rating +
                    `</p>
            </div>
            </div>
          </li>
        `;
                container.append(item);
            });
        })
        .catch(error => {
            console.log(error);
        });
});
