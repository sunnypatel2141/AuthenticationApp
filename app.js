const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connect to database
mongoose.connect(config.database);
mongoose.connection.on('connected', function() {
    console.log('Mongoose conencted to ' + config.database);
});

mongoose.connection.on('error', function(error) {
    console.log('Database error ' + error);
});

const app = express();
const port = 3000;
const users = require('./routes/users');

//CORS middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middle ware
app.use(bodyParser.json());

app.use('/users', users);

//index route
app.get('/', (req, res) => {
    res.send('Invalid end point');
});

//start server
app.listen(port, function() {
    console.log('server started on ' + port);
});

