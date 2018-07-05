# NodeJS Boilerplate
[![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

# Get Started
Constantly improving and updating. Because I use it on my own projects.
- [Installation](https://github.com/dizefurkan/node-api-boilerplate#installation)
- [Install Postgre SQL](https://github.com/dizefurkan/node-api-boilerplate#install-postgresql)
- [Techs](https://github.com/dizefurkan/node-api-boilerplate#techs)
- [Project Structure](https://github.com/dizefurkan/node-api-boilerplate#project-structure)
- [Code Examples](https://github.com/dizefurkan/node-api-boilerplate#code-examples)
- [Scripts](https://github.com/dizefurkan/node-api-boilerplate#install-postgresql)
- [Authors](https://github.com/dizefurkan/node-api-boilerplate#authors)

## Build

This Boilerplate need postgreSQL on database operations.

## Installation

1. Clone the project `git clone https://github.com/dizefurkan/node-api-boilerplate.git`.
2. Install dependencies `npm install`
3. You need to install PostgreSQL db. [How to?](https://github.com/dizefurkan/node-api-boilerplate#install-postgresql)

---

## Install PostgreSQL

https://www.postgresql.org/download/
```js
module.exports = {
  development: {
    url: 'postgres://postgres:12345@localhost:5432/nodeapi',
    dialect: 'postgres'
  },
  test: {
    url: process.env.database || 'postgres://postgres:12345@localhost:5432/nodeapi',
    dialect: 'postgres'
  },
  production: {
    url: process.env.database || 'postgres://postgres:12345@localhost:5432/nodeapi',
    dialect: 'postgres'
  }
};

```

---

## Techs
- [express](https://github.com/expressjs/express)
- [nodemon](https://github.com/remy/nodemon)
- [body-Parser](https://github.com/expressjs/body-parser)
- [morgan](https://github.com/expressjs/morgan)
- [cors](https://github.com/expressjs/cors)
- [joi](https://github.com/hapijs/joi)
- [pg](https://www.npmjs.com/package/pg)
- [pg-hstore](https://www.npmjs.com/package/pg-hstore)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)
- [serve-static](https://github.com/expressjs/serve-static)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [babel-cli](https://www.npmjs.com/package/babel-cli)
- [babel-eslint](https://www.npmjs.com/package/babel-eslint)
- [babel-plugin-module-resolver](https://www.npmjs.com/package/babel-plugin-module-resolver)
- [babel-preset-env](https://www.npmjs.com/package/babel-preset-env)
- [babel-preset-stage-0](https://www.npmjs.com/package/babel-preset-stage-0)
- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)
---
## Project Structure
|Folder|Description|
|--|--|
|data/migrations|The migration folder is here for PostgreSQL|
|public|For public folder|
|src|Source folder|
|src/config|For config folders|
|src/constants|You can keep here like replies file|
|src/core|This folder for application core files|
|src/library|Put files here like dboperations, cryptop operations...|
|src/middlewares|This folder for middlewares|
|src/models|This folder for PostgreSQL|
|src/services|This folder for Services|
---
## Code Examples
### App.js
```js
/* src/app.js */
import express from 'express';
import { server } from 'config';
import expressCore from 'core/express';

const app = express();

expressCore.forEach(item => app.use(item));

app.listen(server.port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Server listening at localhost:%s', server.port);
  }
});
```
### Routers
```js
/* src/core/router.js */
import express from 'express';
import services from 'services';
import middlewares from 'middlewares';

const app = express();

middlewares.forEach(item => {
  app.use(item);
});

services.forEach(item => {
  app[item.method](item.path, item.handler);
});

export default app;
```
### Services
```js
/* src/services/index.js */
import fs from 'fs';
const services = [];

fs
  .readdirSync(__dirname)
  .filter(file => ((file.indexOf('.') !== 0) && (file !== 'index.js')))
  .forEach((file) => {
    const service = require('./' + file).default; // eslint-disable-line
    service.forEach(item => services.push(item));
  });

export default services;
```
### Login Services and Joi
```js
//services/auth/index.js
import validater from './validater';
{
    method: 'post',
    path: '/login',
    handler: async (req, res) => {
      try {
        await Joi.validate(req.body, validater.login);
        return res.send({
          success: true,
          message: 'Done'
        });
      } catch (err) {
        return res.send(err);
      }
    }
}
```
```js
/* src/services/auth/validater.js */
import Joi from 'joi';

export default {
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]/)
      .min(8)
      .max(30)
      .required()
  })
};
```
---
## Scripts
### DEV
For eslint control
```
npm run lint
```
---
Server running on `http://localhost:3030/`
```js
/* src/config/server.js */
export default {
  port: 3030
};

```
---
## Authors
[<img src="https://avatars1.githubusercontent.com/u/28892291?s=460&v=4" width="100px;"/><br /><sub>Said Furkan Dize</sub>](https://github.com/dizefurkan)<br />
