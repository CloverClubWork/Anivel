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
            $("#status").html(status+ ' '+results.status);
            $("#type").html('<i class="fa-solid fa-tv"></i> ' +results.type);
            $("#source").html('<i class="fa-solid fa-book"></i> ' +results.source);
            $("#duration").html('<i class="fa-solid fa-hourglass"></i> ' +results.duration);
        })
        .catch(error => {
            console.log(error);
        });
});
