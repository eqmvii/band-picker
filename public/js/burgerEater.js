$(document).ready(() => {
    console.log(`document loaded; JS linked!`);

    $("#delete-all").on("click", function () {
        console.log("OHHH YOU CLICKED DELETE ALL");
        $.ajax({
            url: "/api/users/all",
            method: "DELETE"
        }).then(function (data) {
            console.log("RESPONSE RECEIVED");
            console.log(data);
        });
    });

});
