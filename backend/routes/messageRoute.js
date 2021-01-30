const express = require('express');
const usersCtrl = require('../controllers/message');
const Router = express.Router();


// router

Router.post('/users/message/:id',usersCtrl.createMessage);
Router.get('/users/message/',usersCtrl.allMessage);
Router.get('/users/message/:id',usersCtrl.oneMessage);
Router.put('/users/message/:id',usersCtrl.modifyMessage);
Router.delete('/users/message/:id',usersCtrl.deleteMessage);


module.exports = Router;
