const bcrypt = require('bcrypt');
const models = require('../models');
const auth = require('../middleware/auth');
const fs = require('fs');

 

//regex
const regex_pass =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const regex_email =/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/;



     // création de l'utilisateur
    exports.register= (req, res, next) => {
        const email = req.body.email;
        const username = req.body.username;
        const usersurname = req.body.usersurname;
        const password = req.body.password;
        const photoURL = req.body.photoURL;
        const description = req.body.description;
        const isAdmin = req.body.isAdmin;

        // on vérifie si les données existe
        if (email == null || username == null || usersurname == null || password == null) {
            return res.status(400).json({ 'error': 'données manquantes' });
        }

        // vérifie si les entrées sont respectées avec un regex
        if (regex_email.test(email) == false) {
            return res.status(400).json({ 'error': 'email invalide' });
        }

        if (regex_pass.test(password) == false) {
            return res.status(400).json({ 'error': 'mot de passe invalide' });
        }

        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })

            .then((userFound) => {
                    if (!userFound) {
                        bcrypt.hash(password, 10, function (err, bcryptedPassword) {
                            const newUser = models.User.create({
                                email: email,
                                username: username,
                                usersurname: usersurname,
                                password: bcryptedPassword,
                                photoURL: photoURL,
                                description: description,
                                isAdmin: false
                            })
                                .then((newUser) => res.status(201).json({
                                        'userId': newUser.id,
                                       
                                    }))
                                .catch((err) => res.status(500).json({ 'error': 'impossible de créer un utilisateur!' }));
                        });

                    } else {
                        return res.status(409).json({ 'error': 'Cet utilisateur existe !' });
                    }
                })
            .catch((err) => res.status(500).json({ 'error': 'Une erreur est survenue!' }));
    };

     // connexion de l'utilisateur
      exports.login= (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        if (email == null ||  password == null) {
            return res.status(400).json({ 'error': 'Il manque un paramètre!' });
          }
          models.User.findOne({
            where: { email: email }
          })
          .then(function(user){
              if (user){
                bcrypt.compare(password, user.password, function(errBycrypt, resBycrypt){
                    if(resBycrypt){
                        return res.status(200).json({ 
                            'userId': user.id, 
                            'token': auth.USERtoken(user),
                            'message': `Hello ${user.username}!`});
                          
                } else {
                return res.status(403).json({ 'error': 'mot de pass invalide' });
              }
          });
        } else {
            return res.status(404).json({'error':'l\'utilisateur n\'existe pas!'})
        }
    })
          .catch(function(err){
            return res.status(500).json({ 'error': 'Une erreur est survenue!' });
          });

        }
      
      

       // connexion au profil de l'utilisateur
      exports.profil= (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = auth.userid(headerAuth);
    const iduser = req.params.id;
    if (userId != iduser )
      return res.status(400).json({ 'error': 'mauvaise identification' });

    models.User.findOne({
      attributes: [ 'id', 'email', 'username', 'usersurname', 'description','photoURL' ],
      where: { id: userId }
    }).then(function(user) {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ 'error': 'utilisateur non trouvé' });
      }
    }).catch(function(err) {
      res.status(500).json({ 'error': 'Impossible d\'accéder à l\'utilisateur' });
    });
    }

    
  // modification du profil de l'utilisateur
  exports.modifyProfil= (req, res, next) => {

    const headerAuth = req.headers['authorization'];
    const userId = auth.userid(headerAuth);
    const iduser = req.params.id;
    if (userId != iduser )
      return res.status(400).json({ 'error': 'mauvaise identification' });

    const description = req.body.description;
    const username = req.body.username;
    const usersurname = req.body.usersurname;
    const photoURL = req.body.photoURL;
    const email = req.body.email;

    models.User.findOne({
      attributes: [ 'id', 'email', 'username', 'usersurname', 'description','photoURL' ],
      where: { id: userId }
    }).then(function(user) {
      if (user) {
       user.update({
         email:(email ? email : user.email),
         username: (username ? username: user.username),
         usersurname: (usersurname ? usersurname: user.usersurname),
         description: (description ? description: user.description),
         photoURL: (photoURL ? photoURL: user.photoURL)
       })
        return  res.status(201).json(user);

      } else {
        res.status(404).json({ 'error': 'utilisateur non trouvé' });
      }
    }).catch(function(err) {
      res.status(500).json({ 'error': 'Impossible d\'accéder à l\'utilisateur' });
    });
    }

     // suppression d'un profil
  exports.DeleteProfil= (req, res, next) => {

    const headerAuth  = req.headers['authorization'];
    const userId      = auth.userid(headerAuth);
    const iduser = req.params.id;
    if (userId != iduser )
      return res.status(400).json({ 'error': 'mauvaise identification' });

    models.User.findOne({
      where: { id: userId }
    }).then((user) => {
      if (user.photoURL !== null) {
        const filename = user.photo.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          // s'il y a une photo de profile, on supprimme tout
          models.User.destroy({ where: { id: userId } });
          res.status(200).json({ message: "utilisateur supprimé!" });
        });
      } else {
        // si pas de photo de profil, on supprime l'utilisateur
        models.User.destroy({ where: { id: userId } }); 
        res.status(200).json({ message: "utilisateur supprimé!" });
      }
    })
    .catch(function(err) {
      res.status(500).json({ 'error': 'Impossible d\'accéder à l\'utilisateur' });
    });
  }

    // récupération de tout les profils
  exports.ALLProfil= (req, res, next) => {

    const headerAuth  = req.headers['authorization'];
    const userId      = auth.userid(headerAuth);
    if (!userId)
      return res.status(400).json({ 'error': 'mauvaise identification' });

    models.User.findAll({
      attributes: [ 'id', 'username', 'usersurname', 'description','photoURL' ],
    })
    .then(function(user) {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ 'error': 'Aucun utilisateurs' });
      }
    }).catch(function(err) {
      res.status(500).json({ 'error': 'Impossible d\'accéder aux utilisateurs' });
    });
    }

