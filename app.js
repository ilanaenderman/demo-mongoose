// require libraries
const User    = require('./data/base/database.js');
const cluster = require('cluster');

// coe to run if we're in a master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

// Code to run if we're in a worker process
} else {

    // Include Express
    var express = require('express');

    // Create a new Express application
    var app = express();

    // Add a basic route – index page
    app.get('/', function (req, res) {
        res.send('Hello from worker' + cluster.worker.id);
    });

    // Bind to a port
    app.listen(8000);
    console.log('Server connected to port 8000', cluster.worker.id);
}



