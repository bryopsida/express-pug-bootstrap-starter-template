# What is this?

This is a basic starter template for a web app. It's intended use case is for simple things that do not warrant using a SPA or other heavier client side frameworks. It opts for a very simple dev loop, no building/compiling, simply edit the files and the changes are live.

## Pre-Requisites

- Node.JS >= 20

## Getting Started

To launch the app, install the dependencies `npm install`, and then run `npm start`, and navigate [here](http://localhost:3000/), to login check the `./logs/audit.log` for the generated admin password, you can change this afterwards.

If you wish to make a change, follow the above directions, expect instead of running `npm start`, run `npm run dev`. On save of your JavaScript files the server will automatically reload with the new changes.

## What opinions have been added

1. [Express](https://www.npmjs.com/package/express) - this is used for the application server
2. [Helmet](https://www.npmjs.com/package/helmet) - when NODE_ENV is set to production helmet is used
3. [Nodemon](https://www.npmjs.com/package/nodemon) - used for automatically reloading when JavaScript files are changed
4. [Casl](https://www.npmjs.com/package/@casl/ability) - used for authorization rules
5. [Pug](https://www.npmjs.com/package/pug) - used for server side rending of pages
6. [Jest](https://www.npmjs.com/package/jest) - used for unit tests
7. [Playwright](https://www.npmjs.com/package/playwright) - used for e2e tests
8. [Iron-session](https://www.npmjs.com/package/iron-session) - used for stateless auth using cookies
9. [Bootstrap](https://www.npmjs.com/package/bootstrap) - used for client styling and components
10. [Standard.JS](https://www.npmjs.com/package/standard) - linting rules
11. [Prettier](https://www.npmjs.com/package/prettier) - for formatting files
12. [Config](https://www.npmjs.com/package/config) - for providing configuration system
13. [Sequelize](https://www.npmjs.com/package/sequelize) - ORM
14. [Sqlite3](https://www.npmjs.com/package/sqlite3) - Embedded database
15. [Umzug](https://www.npmjs.com/package/umzug) - Migration and seed runner

## NPM Scripts

| Script   | Description                                                          |
| -------- | -------------------------------------------------------------------- |
| dev      | Uses nodemon to automatically restart server when javascript changes |
| test     | Runs unit tests using Jest                                           |
| test:e2e | Runs e2e tests using Playwright                                      |
| lint     | Checks code/files using Standard.JS and Prettier                     |
| lint:fix | Automatically fix style and linting violations                       |
| start    | Runs the application server                                          |

## Environment Variables

| Name            | Default | Description                                |
| --------------- | ------- | ------------------------------------------ |
| PORT            | 3000    | The Listening port of the server           |
| COOKIE_PASSWORD |         | The 32 byte key used to encrypt the cookie |

## Structure

- `services/` - services that support pages, routes and other activities of the server
- `routes/` - express route controllers
- `public/` - static files served by the web server
- `middleware/` - middleware functions that can be applied to many routes
- `config/` - config files and environment variable mapping
- `tests/` - E2E Tests
- `views/` - PUG templates
- `db/` - Database models, migrations and seeds

## Managing DB Models and Migrations

### Create a new model

You can create a new model/table by running `npx sequelize-cli model:generate --name TableName --attributes prop1:string,prop2:string`, this will create a basic migration for you under `./db/migrations` and a new model under `./db/models`.

### Create a new migration

You can create a new migration by running `npx sequelize-cli migration:create --name your-migration-name`

### Create a new seed

You can create a new seed by running `npx sequelize-cli seed:generate --name seed-name`

### Manually running migrations

You can manually run migrations by running `npx sequelize-cli db:migrate`

## Post template checklist

- [ ] Change footer copyright to match your needs
- [ ] Change header to add logo/branding to match your needs
- [ ] Change global.css to match your styling needs
- [ ] Change/remove renovate.json to match your needs
- [ ] Update package name in package.json to your project name
- [ ] Update `services/users.js` to use your user store
- [ ] Update COOKIE_PASSWORD for production instances
