import express from 'express';
import services from 'services';
import libraryToken from 'library/token';

const app = express();

app.use((req, res, next) => {
  if (req.path === '/register' || req.path === '/login') {
    next();
  } else {
    const token = req.headers.token;
    if (token) {
      const checkToken = libraryToken.verifyToken(token);
      checkToken.then(result => {
        req.decoded = result.verifyResult;
        next();
      }).catch(() => {
        res.send({ success: false, message: 'Token Error' });
      });
    } else {
      res.send({ success: false, message: 'No Token', url: req.path });
    }
  }
});

services.forEach(item => {
  app[item.method](item.path, item.handler);
});

export default app;
