$(document).ready(() => {
    console.log("upload.js loaded");

    // boilerplate from: https://devcenter.heroku.com/articles/s3-upload-node
    // TODO: Do you need encodeURIComponent(file.name) ?
    document.getElementById("file-input").onchange = () => {
        const files = document.getElementById('file-input').files;
        const file = files[0];
        var extension = file.name.split('.').pop();
        var valid_extensions = ['jpg', 'png', 'gif'];
        if (!file || valid_extensions.indexOf(extension.toLowerCase()) === -1 || file.size > 900000) {
            alert("File upload error. Try another small image file.");
            return
        }

        getSignedRequest(file);

        function getSignedRequest(file) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        uploadFile(file, response.signedRequest, response.url);
                    }
                    else {
                        alert('Could not get signed URL.');
                    }
                }
            };
            xhr.send();
        } // end getSignedRequest

        function uploadFile(file, signedRequest, url) {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', signedRequest);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        document.getElementById('preview').src = url;
                        document.getElementById('avatar-url').value = url;
                    }
                    else {
                        alert('Could not upload file.');
                    }
                }
            };
            xhr.send(file);
        } // end uploadFile
    };

});
