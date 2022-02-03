import express from 'express';
import http from 'http';
const cors = require('cors');
const port = 3000; // port to listen
// Create a new express app instance
const app: express.Application = express();
const actuator = require('express-actuator')
app.use(cors())
app.use(actuator())
let httpServer = require("http").Server(app);

app.get('/', function (req, res) {
    res.send("Hello World from the Foreside Innovation Day.");    
});

const server = httpServer.listen(port, function () {
    console.log(`listening on http://localhost:${port}`);
});