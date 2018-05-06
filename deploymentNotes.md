# Deployment Notes

Creating the app and provisioning the jawsdb for MySQL

1. heroku create [project name]
2. heroku addons:create jawsdb
3. Get the secret URL: heroku config:get JAWSDB_URL
