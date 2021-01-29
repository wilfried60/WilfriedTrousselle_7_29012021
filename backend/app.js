
// Importation
const express     = require('express');
const bodyParser  = require('body-parser');
const apiRouter   = require('./routes/usersRoute');
const app = express();
const path = require('path');


// on déclare le header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


// configuration de bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/', apiRouter);

module.exports = app;