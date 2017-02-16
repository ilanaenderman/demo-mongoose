// require libraries
// require libraries
const express = require('express');
const app     = express();
const User = require('./data/base/database.js');


// render /
app.get('/', (req, res) => {
    res.send("hello");
});

// Listen on port 8000
app.listen(8000, ()=> {
    console.log('server running');
});gi