$(document).ready(() => {
    console.log(`document loaded; JS linked!`);

    $("#delete-all").on("click", function () {
        console.log("OHHH YOU CLICKED DELETE ALL");
        $.ajax({
            url: "/api/users/all",
            method: "DELETE"
        }).then(function (data) {
            console.log("RESPONSE RECEIVED");
            location.reload();
        });
    });

    $("#delete-one").on("click", function () {
        console.log("OHHH YOU CLICKED DELETE JUST THE ONE");
        $.ajax({
            url: "/api/users/1",
            method: "DELETE"
        }).then(function (data) {
            console.log("RESPONSE RECEIVED");
            location.reload();
        });
    });

    $("body").on("click", ".delete-one-todo", function () {
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


});
