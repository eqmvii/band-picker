# Model Notes

## Cretion

Migrations:

`sequelize model:generate --name Band --attributes name:string,stage:string,time:date`

`sequelize migration:create --name [name]`

Seeds:

`sequelize seed:generate --name first-band`

`sequelize db:seed:undo:all`

`sequelize db:seed:undo:`

## Running

`sequelize db:migrate` and `sequelize db:migrate:undo` or `sequelize db:migrate:undo:all`

`sequelize db:seed:all`
