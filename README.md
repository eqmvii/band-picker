# Node/Express Authentication Starter

A simple app built to learn/practice sequelize, MySQL, handlebars, express, passport.js, etc.

Now it's kind of about making a schedule for a music festival

[Live on Heroku](https://burger-eater-eqmvii.herokuapp.com)

Start with nodemon: `npm run develop`

Start generally: `node server.js` or `npm start`

# sequelize process

1. Be sure sequelize is globally installed: `sequelize init:config & sequelize init:models`
2. prep the project with `sequelize init:config & sequelize init:models`
3. Seed data: sequelize db:seed:all

# deployment notes

[Deploymeny Notes](deploymentNotes.md)

[Model Notes](modelNotes.md)
# burger-eater?

This was originally based on an 'eat da burger' bootcamp exercise but took on a life of its own

# Todo List

* Cache band images and/or URLs
* Make mobile responsive
* Make times less terrible
* Modals
* Make login actually login
* Add notes about bands
* Add band ratings DB integration
* Move and refactor AWS profile pic hosting logic
* File upload security & restrictions

