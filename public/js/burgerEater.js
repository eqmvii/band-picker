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
        var nuEmail = $(`#edit-email-${toUpdate}`).val().trim();
        var nuPassword = $(`#edit-password-${toUpdate}`).val().trim();
        console.log(`OHHH YOU CLICKED UPDATE ${toUpdate}`);
        $.ajax({
            url: `/api/users/${toUpdate}`,
            method: "PUT",
            data: {
                email: nuEmail,
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


});
