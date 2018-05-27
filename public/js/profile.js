$(document).ready(() => {
    console.log("profile.js loaded");


    $('.ui.rating').rating({
        maxRating: 10
    }).rating('setting', 'onRate', function (value) {
        var user = parseInt($(this).attr('data-js-user'), 10);
        var band = parseInt($(this).attr('data-js-band'), 10);
        console.log(`User: ${user} | Band: ${band} | Rating: ${value}`);
        $.ajax({
            url: `/api/rating`,
            method: "POST",
            data: {
                band: band,
                user: user,
                rating: value
            }
        }).then(function (data) {
            console.log("Response received");
            // Do this?
            // location.reload();
        });
    });

    $("#delete-all").on("click", function () {
        console.log("OHHH YOU CLICKED DELETE ALL");
        $.ajax({
            url: "/api/all",
            method: "DELETE"
        }).then(function (data) {
            console.log("RESPONSE RECEIVED");
            location.reload();
        });
    });

    // listen for clicks on any user's delete button
    $("body").on("click", ".js-add-band", function () {
        console.log("add band clicked");
        var bandToAdd = parseInt($(this).attr("data-js-band"), 10);
        var userToAdd = parseInt($(this).attr("data-js-user"), 10);
        console.log(`Add band ${bandToAdd}`);
        $.ajax({
            url: `/api/banduser`,
            method: "POST",
            data: {
                userToAdd: userToAdd,
                bandToAdd: bandToAdd
            }
        }).then(function (data) {
            console.log("Response received");
            location.reload();
        });
    });

    // listen for clicks on any user's delete button
    $("body").on("click", ".js-remove-band", function () {
        console.log("add band clicked");
        var bandToRemove = parseInt($(this).attr("data-js-band"), 10);
        var userToRemove = parseInt($(this).attr("data-js-user"), 10);
        console.log(`Remove band ${bandToRemove}`);
        $.ajax({
            url: `/api/banduser`,
            method: "DELETE",
            data: {
                userToRemove: userToRemove,
                bandToRemove: bandToRemove
            }
        }).then(function (data) {
            console.log("Response received");
            location.reload();
        });
    });

});
