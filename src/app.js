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
