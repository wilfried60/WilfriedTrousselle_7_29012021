const express = require('express');
const messageCtrl = require('../controllers/message');
const likeCtrl = require('../controllers/like');
const commentaireCtrl = require('../controllers/commentaire');
const Router = express.Router();


// message

Router.post('/users/message/',messageCtrl.createMessage);
Router.get('/users/message/',messageCtrl.allMessage);
Router.get('/users/message/:id',messageCtrl.oneMessage);
Router.put('/users/message/:id',messageCtrl.modifyMessage);
Router.delete('/users/message/:id',messageCtrl.deleteMessage);


//like
Router.post('/users/message/:id/like',likeCtrl.like); 
Router.get('/users/like',likeCtrl.getlike); 

//commentaire
Router.post('/users/:id/commentaire',commentaireCtrl.createcommentaire);
Router.delete('/users/commentaire/:id',commentaireCtrl.deletecommentaire);
Router.get('/users/commentaire',commentaireCtrl.getcommentaire);

module.exports = Router;
