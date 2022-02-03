import express from 'express';
import http from 'http';

const cors = require('cors');
const port = 3000; // port to listen
// Create a new express app instance
const app: express.Application = express();

app.use(cors())
let httpServer = require("http").Server(app);
const config = {
    title: 'Express Status',
    path: '/status',
    spans: [{
      interval: 1,
      retention: 60
    }, {
      interval: 5,
      retention: 60
    }, {
      interval: 15,
      retention: 60
    }],
    chartVisibility: {
      cpu: true,
      mem: true,
      load: true,
      responseTime: true,
      rps: true,
      statusCodes: true
    },
    healthChecks: [
      {
        protocol: 'http',
        host: 'localhost',
        path: '/',
        port: '3000'
      }
    ],
    ignoreStartsWith: '/admin'
  }
const statusMonitor = require('express-status-monitor')(config);
app.use(require('express-status-monitor')());
app.get('/', function (req, res) {
    res.send("Hello World from the Foreside Innovation Day.");    
});

const server = httpServer.listen(port, function () {
    console.log(`listening on http://localhost:${port}`);
});