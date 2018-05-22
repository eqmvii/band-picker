require('dotenv').config();
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
console.log(`S3 bucket: ${S3_BUCKET}`);
aws.config.region = 'us-east-2';
const PORT = process.env.PORT || 4000;


module.exports = function (app) {

    // file upload boilerplate
    app.get('/sign-s3',
        require('connect-ensure-login').ensureLoggedIn('/login'),
        (req, res) => {
            console.log("Sign-s3 route hit");
            const s3 = new aws.S3();
            const fileName = "u" + req.user.id + "p" + PORT + "r" + Math.floor(Math.random() * 100) + "f" + req.query['file-name'];
            const fileType = req.query['file-type'];
            const s3Params = {
                Bucket: S3_BUCKET,
                Key: fileName,
                Expires: 60,
                ContentType: fileType,
                ACL: 'public-read'
            };

            console.log(s3Params);

            s3.getSignedUrl('putObject', s3Params, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.end();
                }
                const returnData = {
                    signedRequest: data,
                    url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
                };
                res.write(JSON.stringify(returnData));
                res.end();
            });
        });

    app.post('/save-details',
        require('connect-ensure-login').ensureLoggedIn('/login'),
        (req, res) => {
            let url = req.body.profile_pic_url;
            let id = parseInt(req.body.user_id, 10);
            console.log(`Profile Pic Added; URL: ${url} | ID: ${id}`)
            req.user.update({ profile_pic_url: url }, { where: { id: id } })
                .then(function (response) {
                    console.log(response);
                    res.redirect('/profile');
                });
        });

}
