$(document).ready(() => {

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

});
