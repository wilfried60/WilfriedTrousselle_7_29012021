const bcrypt = require('bcrypt');
const models = require('../models');
const fs = require('fs');
const auth = require('../middleware/auth');
const JWT = 'RANDOM_TOKEN_SECRET';
const jwt = require('jsonwebtoken');


 

//regex
const regex_pass =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const regex_email =/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/;



     // création de l'utilisateur
    exports.register= (req, res, next) => {
        let email = req.body.email;
        let username = req.body.username;
        let usersurname = req.body.usersurname;
        let password = req.body.password;
        let photoURL = req.body.photoURL;
        let description = req.body.description;
        let isAdmin;
        if (email == 'admin@admin.admin'){
             isAdmin = true;
        } else {
          isAdmin = false;
        }
        

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
                                description: description,
                                isAdmin: isAdmin
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
        let email = req.body.email;
        let password = req.body.password;
        if (email == null ||  password == null) {
            return res.status(400).json({ 'error': 'Il manque un paramètre!' });
          }

          if (email == 'admin@admin.admin'){
            isAdmin = true;
       } else {
         isAdmin = false;
       }
      
          models.User.findOne({
            where: { email: email }
          })
          .then(function(user){
              if (user){
                bcrypt.compare(password, user.password, function(errBycrypt, resBycrypt){
                     if(resBycrypt){
                   res.cookie('Token',auth.USERtoken(user),{maxAge:24 * 60 * 60 * 1000,httpOnly:true}); //cookies 24h         
                     res.status(200).json({  
                            'userBoolean': true, 
                            'userId': user.id, 
                            'token': auth.USERtoken(user),
                            'message': `Hello ${user.username}!`,
                            'usersurname': user.usersurname,
                            'username': user.username,
                          }); 
                                              
                } else {
               return res.status(403).json({ 'error': 'mot de passe invalide' });
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

        let usersId = "";
        let token = req.cookies.Token;
        if(token != null) {
          try {
            let tokenVerif = jwt.verify(token, JWT);
            if(tokenVerif != null)
              usersId = tokenVerif.userId;
          } catch(err) { }
        }
        const userId = usersId;

    let iduser = req.params.id;
    if (userId != iduser )
      return res.status(400).json({ 'error': 'mauvaise identification' });
    

    models.User.findOne({
      attributes: [ 'id', 'email', 'username', 'usersurname', 'description','photoURL', 'isAdmin' ],
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

    let usersId = "";
let token = req.cookies.Token;
if(token != null) {
  try {
    let tokenVerif = jwt.verify(token, JWT);
    if(tokenVerif != null)
      usersId = tokenVerif.userId;
  } catch(err) { }
}
const userId = usersId;

    let iduser = req.params.id;
    if (userId != iduser )
      return res.status(400).json({ 'error': 'mauvaise identification' });
  

      let description = req.body.description;
      let username = req.body.username;
      let usersurname = req.body.usersurname;
      let email = req.body.email;
      let photoURL = req.file;

    models.User.findOne({
      attributes: [ 'id', 'email', 'username', 'usersurname', 'description','photoURL' ],
      where: { id: userId }
    }).then(function(user) {
      if (user) {
        if (photoURL) {
          photoURL = `${req.protocol}://${req.get("host")}/images/${ req.file.filename}`;

          if(user.photoURL){
            const filename = user.photoURL.split('/images/')[1];
             fs.unlink(`images/${filename}`,  (err) => {
              if (err) console.log(err);
              else {
                console.log('fichier supprimé!');
              }
            });
          }
        };
        
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

    let usersId = "";
    let token = req.cookies.Token;
    if(token != null) {
      try {
        let tokenVerif = jwt.verify(token, JWT);
        if(tokenVerif != null)
          usersId = tokenVerif.userId;
      } catch(err) { }
    }
    const userId = usersId;

    let iduser = req.params.id;
    if (userId != iduser )
      return res.status(400).json({ 'error': 'mauvaise identification' });

    models.User.findOne({
      where: { id: userId }
    }).then((user) => {
      if (user.photoURL !== null) {
        let filename = user.photoURL.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          // s'il y a une photo de profile, on supprimme tout
          models.User.destroy({ where: { id: userId } });
          res.clearCookie('Token');
          res.status(200).json({ message: "utilisateur supprimé!" });
        });
      } else {
        // si pas de photo de profil, on supprime l'utilisateur
        models.User.destroy({ where: { id: userId } }); 
        res.clearCookie('Token');
        res.status(200).json({ message: "utilisateur supprimé!" });
      }
    })
    .catch(function(err) {
      res.status(500).json({ 'error': 'Impossible d\'accéder à l\'utilisateur' });
    });
  }
    // récupération de tout les profils
  exports.ALLProfil= (req, res, next) => {

    let usersId = "";
let token = req.cookies.Token;
if(token != null) {
  try {
    let tokenVerif = jwt.verify(token, JWT);
    if(tokenVerif != null)
      usersId = tokenVerif.userId;
  } catch(err) { }
}
const userId = usersId;

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

