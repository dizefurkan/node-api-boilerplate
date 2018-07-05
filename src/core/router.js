import express from 'express';
import services from 'services';
import token from 'middleware/token';

const app = express();

app.use(token);

services.forEach(item => {
  app[item.method](item.path, item.handler);
});

export default app;
