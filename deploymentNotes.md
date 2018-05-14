# Deployment Notes

Creating the app and provisioning the jawsdb for MySQL

1. heroku create [project name]
2. heroku addons:create jawsdb
3. Get the secret URL: heroku config:get JAWSDB_URL
4. Important: install sequelize-cli locally to make it work with remote migrations

## Run migrations after deployment:

[Model Notes](modelNotes.md)

`heroku run [migration command]`

ex.: `heroku run sequelize db:migrate` or `heroku run sequelize db:seed`


`sequelize db:migrate` and `sequelize db:migrate:undo` or `sequelize db:migrate:undo:all`

`sequelize db:seed:all`
