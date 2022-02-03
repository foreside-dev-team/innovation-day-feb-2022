import express from 'express';
import http from 'http';

const port = 3000; // port to listen
const cors = require('cors');

// Create a new express app instance
const app: express.Application = express();
app.use(cors())
let httpServer = require("http").Server(app);

app.get('/', function (req, res) {
    res.send("Hello World from the Foreside Innovation Day.");    
});

const server = httpServer.listen(port, function () {
    console.log(`listening on http://localhost:${port}`);
});