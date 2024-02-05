$(document).ready(function () {
    function formatNumber(number) {
        if (number >= 1000) {
            // Divide the number by 1000 and append 'k'
            return (number / 1000).toFixed(1) + "k";
        } else {
            // If the number is less than 1000, just return it as is
            return number.toString();
        }
    }

    function getQueryParam(key) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
    }
    const idParam = getQueryParam("id");
    let params = "https://api.jikan.moe/v4/anime/" + idParam + "/full";
    let episodeParam =
        "https://consumetmyapi.vercel.app/meta/mal/info/" + idParam;
    fetch(params)
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            return response.json();
        })
        .then(data => {
            const results = data.data;
            $("#animeCover").attr("src", results.images.webp.large_image_url);
            $("#anime-title").text(results.title_english);
            $("#anime-title-romaji").text(results.title);
            $("#score").text(results.score);
            const favorites = formatNumber(results.favorites);
            $("#favorites").text(favorites);
            let status;
            if (results.status == "Finished Airing") {
                status = '<i class="fa-solid fa-check"></i>';
            } else {
                status = '<i class="fa-solid fa-clock"></i>';
            }
            $("#status").html(status + " " + results.status);
            $("#type").html('<i class="fa-solid fa-tv"></i> ' + results.type);
            $("#source").html(
                '<i class="fa-solid fa-book"></i> ' + results.source
            );
            $("#duration").html(
                '<i class="fa-solid fa-hourglass"></i> ' + results.duration
            );
            $("#overview").html(results.synopsis);
            let aired;
            if (results.aired.prop.to.year == null) {
                aired =
                    results.aired.prop.from.year +
                    "-" +
                    results.aired.prop.from.month +
                    "-" +
                    results.aired.prop.from.day +
                    " to ?";
            } else {
                aired =
                    results.aired.prop.from.year +
                    "-" +
                    results.aired.prop.from.month +
                    "-" +
                    results.aired.prop.from.day +
                    " to " +
                    results.aired.prop.to.year +
                    "-" +
                    results.aired.prop.to.month +
                    "-" +
                    results.aired.prop.to.day;
            }
            $("#airedTime").text(aired);
            const premiered = results.season;
            $("#season").text(premiered.toUpperCase() + " " + results.year);
            const genres = results.genres;
            genres.forEach(genres => {
                const item =
                    `
                <li>
                  <p>` +
                    genres.name +
                    `</p>
                </li>
              `;
                $("#genres").append(item);
            });
            const studios = results.studios;
            studios.forEach(studios => {
                const item =
                    `
                <li>
                  <p>` +
                    studios.name +
                    `</p>
                </li>
              `;
                $("#studios").append(item);
            });
        })
        .catch(error => {
            console.log(error);
        });

    //Episodes
    fetch(episodeParam)
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            return response.json();
        })
        .then(data => {
            const results = data.episodes;
            results.forEach(episodes => {
                let epTitle, epSynopsis, epCover;
                epCover = episodes.image;
                if (episodes.title == null || episodes.title == undefined) {
                    epTitle = "Episode " + episodes.number;
                }else{
                  epTitle = episodes.title;
                }
                if (episodes.description == null) {
                    epSynopsis = "Stream Episode " + episodes.number + " on HD";
                }
                const episode =
                    `
        <li data-src=''>
          <img src='` +
                    epCover +
                    `' alt='Episode Cover' loading='lazy'/>
          <div>
            <h5>` +
                    epTitle +
                    `</h5>
            <p>` +
                    epSynopsis +
                    `</p>
          </div>
        </li>
        `;
                $("#episodes").append(episode);
            });
        })
        .catch(error => {
            console.log(error);
        });
        
    const list = $("#episodes");
                const itemsPerPage = 3; // Set the number of items per page
                const totalItems = list.children("li").length;
                console.log(totalItems)
                let currentPage = 1;

                function showItems(page) {
                    const startIndex = (page - 1) * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;

                    list.find("li").hide().slice(startIndex, endIndex).show();
                }

                function renderPagination() {
                    const totalPages = Math.ceil(totalItems / itemsPerPage);
                    const paginationContainer = $("#pagination");
                    paginationContainer.empty();

                    for (let i = 1; i <= totalPages; i++) {
                        const pageLink = $(
                            '<span class="page-link">' + i + "</span>"
                        );
                        pageLink.click(function () {
                            currentPage = i;
                            showItems(currentPage);
                        });
                        paginationContainer.append(pageLink);
                    }
                }
                showItems(currentPage);
                renderPagination();
});
