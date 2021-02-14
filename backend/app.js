
// Importation
const express     = require('express');
const bodyParser  = require('body-parser');
const userRouter   = require('./routes/usersRoute');
const messageRouter   = require('./routes/messageRoute');
const app = express();
const path = require('path');
const helmet = require("helmet");


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
app.use(helmet()); // Protection en configurant les en-têtes HTTP
app.use('/api/', userRouter);
app.use('/api/', messageRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;