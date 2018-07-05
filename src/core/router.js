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
