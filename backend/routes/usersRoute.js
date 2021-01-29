const express = require('express');
const usersCtrl = require('../controllers/users');
const Router = express.Router();


// router

Router.post('/users/register',usersCtrl.register);
Router.post('/users/login',usersCtrl.login);
Router.get('/users/profil/:id',usersCtrl.profil);
Router.put('/users/profil/:id',usersCtrl.modifyProfil);
Router.get('/users/profil/',usersCtrl.ALLProfil);
Router.delete('/users/profil/:id',usersCtrl.DeleteProfil);

module.exports = Router;
