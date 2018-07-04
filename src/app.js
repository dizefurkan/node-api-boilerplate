import express from 'express';
import expressCore from 'core/express';
import { server } from 'config';
const app = express();

expressCore.forEach(item => app.use(item));

app.listen(server.port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server listening at localhost:%s", server.port);
  }
});