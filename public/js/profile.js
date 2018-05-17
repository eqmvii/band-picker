$(document).ready(() => {

    console.log("profile js loaded");

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

});
