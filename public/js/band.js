$(document).ready(() => {
    console.log("band.js loaded");

    // TODO: Consider refactoring to share with other pages that do this?

    var bandName = $('[data-js-name]').attr('data-js-name');
    addBandImage(bandName);

    function addBandImage(bandName) {
        $.ajax({
            url: `/api/spotify/band/${bandName}`,
            method: "GET"
        }).then(function (data) {
            // console.log("Bandname Response Received");
            console.log(data);
            $(`[data-js-name="${bandName}"]`).attr('src', data.result.images[1].url);
            $(`[data-js-spotify-url="${bandName}"]`)
                .attr('href', data.result.external_urls.spotify)
                .text(bandName + " on Spotify");
        });
    }


});
