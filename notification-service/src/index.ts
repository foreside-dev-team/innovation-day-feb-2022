import { RabbitMQClient } from "../services/rabbitmq/amqp-client";
import express from 'express';
import { config } from "./config";

const client = new RabbitMQClient({
    url: `amqp://${config.rabbitmq.host}:5672`,
});

const port = 3000; // port to listen
// Create a new express app instance
const app: express.Application = express();
const actuator = require('express-actuator')

app.use(actuator())
let httpServer = require("http").Server(app);

app.get('/', function (req, res) {
    res.send("Hello World from the Foreside Innovation Day.");    
});

const server = httpServer.listen(port, function () {
    console.log(`listening on http://localhost:${port}`);
});