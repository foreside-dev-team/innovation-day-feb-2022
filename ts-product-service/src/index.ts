import express from 'express';
import "reflect-metadata";
import "./rabbitmq/product";

import routes from './routes';

const port = 3000; // port to listen
// Create a new express app instance
const app: express.Application = express();
const actuator = require('express-actuator')

app.use(actuator())
let httpServer = require("http").Server(app);

app.use(routes);

const server = httpServer.listen(port, function () {
    console.log(`listening on http://localhost:${port}`);
});

