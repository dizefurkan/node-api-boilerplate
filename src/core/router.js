import express from 'express';
import services from '../services';

const app = express();

services.forEach((item, index) => {
    app[item.method](item.path, item.handler);
});

export default app;