// require libraries
const User    = require('./data/base/database.js');
const os      = require('os');
const cluster = require('cluster');

// coe to run if we're in a master process
if (cluster.isMaster) {

    // Create a worker for each CPU
    for (var i = 0; i < os.cpus().length; i ++) {
        var worker = cluster.fork();
        console.log("started working with pid%d", worker.process.pid);
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker died', worker.id);
        worker;
    })

// Code to run if we're in a worker process
} else {

    // Include Express
    var express = require('express');

    // Create a new Express application
    var app = express();

    // Add a basic route – index page
    app.get('/', (req, res) => {
        res.send('Hello from worker' + cluster.worker.id);
    });

    // Bind to a port
    app.listen(8000);
    console.log('Server connected to port 8000', cluster.worker.id);
}



