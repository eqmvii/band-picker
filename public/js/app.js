$(document).ready(() => {
    console.log(`document loaded; JS linked!`);


    //
    // SEMANTIC UI
    //

    $('.select').dropdown();

    $('.ui.rating').rating({
        maxRating: 10
    });



    //
    // USERS
    //

    // listen for clicks on any user's delete button
    $("body").on("click", ".js-delete-one-user", function () {
        var toDelete = parseInt($(this).attr("data-js"), 10);
        console.log(`OHHH YOU CLICKED DELETE ${toDelete}`);
        $.ajax({
            url: `/api/users/${toDelete}`,
            method: "DELETE"
        }).then(function (data) {
            console.log("RESPONSE RECEIVED");
            location.reload();
        });
    });

    // listen for clicks on any user's update button
    $("body").on("click", ".js-update-one-user", function () {
        var toUpdate = parseInt($(this).attr("data-js"), 10);
        var nuUsername = $(`#edit-username-${toUpdate}`).val().trim();
        var nuPassword = $(`#edit-password-${toUpdate}`).val().trim();
        console.log(`OHHH YOU CLICKED UPDATE ${toUpdate}`);
        $.ajax({
            url: `/api/users/${toUpdate}`,
            method: "PUT",
            data: {
                username: nuUsername,
                password: nuPassword
            }
        }).then(function (data) {
            console.log("RESPONSE RECEIVED");
            location.reload();
        });
    });

    $("body").on("click", ".js-edit-button", function () {
        var toUpdate = $(this).attr("data-js");
        console.log(`OHHH YOU CLICKED EDIT ${toUpdate}`);
        $(`#edit-form-${toUpdate}`).toggle();
    });


    //
    // BANDS
    //

    // listen for clicks on any user's delete button
    $("body").on("click", ".js-delete-one-band", function () {
        var toDelete = parseInt($(this).attr("data-js"), 10);
        console.log(`Trying to delete band #${toDelete}`);
        $.ajax({
            url: `/api/bands/${toDelete}`,
            method: "DELETE"
        }).then(function (data) {
            console.log("Response received");
            location.reload();
        });
    });

    // loop through bands on page, ajax in their picture
    // console.log("Ajaxing!");
    // addBandImage("slayer");

    var imagesToUpdate = $('.js-band-image');

    // TODO: Replace with .map or .each or something
    for (let i = 0; i < imagesToUpdate.length; i++) {
        let bandName = $(imagesToUpdate[i]).attr('data-js-name');
        console.log(`Band image for ${bandName}`);
        addBandImage(bandName)
    }

    // TODO: Error handling for if there's no spotify image data
    function addBandImage(bandName) {
        $.ajax({
            url: `/api/spotify/band/${bandName}`,
            method: "GET"
        }).then(function (data) {
            // console.log("Bandname Response Received");
            console.log(data);
            $(`[data-js-name="${bandName}"]`).attr('src', data.result.images[1].url);
            // location.reload();
        });
    }

});
