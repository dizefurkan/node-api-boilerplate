import express from 'express';
import expressCore from './src/core/express';
import { server } from './src/config';

const app = express();

expressCore.forEach(item => app.use(item));

app.listen(server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server listening at localhost:%s", server.port);
    }
});