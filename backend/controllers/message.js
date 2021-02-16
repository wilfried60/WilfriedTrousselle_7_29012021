
const models = require('../models');
const auth = require('../middleware/auth');
const fs = require('fs');

 // création du message
 exports.createMessage= (req, res, next) => {
  let headerAuth = req.headers['authorization'];
  let userId = auth.userid(headerAuth);
    if (!userId)
      return res.status(400).json({ 'error': 'mauvaise identification' });
      
      let title = req.body.title;
      let contenu = req.body.contenu;
      let imageURL = req.body.imageURL;
    

      if (imageURL != null) {
        imageUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      } else {
        imageUrl = null;
      }

      if (contenu == null){
          return res.status(400).json({'error': 'contenu introuvable'})
           }

       models.User.findOne({
           where: { id: userId}
       })
       .then((user) => {
               if (user) {
                   models.Message.create({
                       title: title,
                       contenu: contenu,
                       imageURL: imageURL,
                       likes: 0,
                       dislikes: 0,
                       UserId: user.id
                   });
                   return res.status(201).json({ message: 'Publication créer!' });

               } else {
                   return res.status(500).json({ 'error': 'Impossible de créer la publication!' });
               }
           })
           .catch((err) => res.status(500).json({ 'error': 'Une erreur est survenue!' }));
   
},

//Récupération d'un message
exports.oneMessage= (req, res, next) => {
  let headerAuth = req.headers['authorization'];
  let userId = auth.userid(headerAuth);
    if (!userId)
      return res.status(400).json({ 'error': 'mauvaise identification' });

      let messageID = req.params.id;

models.Message.findOne({
    attributes:['id', 'title', 'contenu', 'imageURL', 'likes'],
    where: { id: messageID },
    include: [{
        model: models.User,
        attributes: [ 'id', 'username', 'usersurname', 'photoURL' ]
      }]
})
   .then((message) => {
    if (message) {
        return res.status(201).json({message});

    } else {
        return res.status(500).json({ 'error': 'Aucune publication!' });
    }
})
.catch((err) => res.status(500).json({ 'error': 'Une erreur est survenue!' })); 

}

//Modification d'un message
exports.modifyMessage= (req, res, next) => {
  let headerAuth = req.headers['authorization'];
  let userId = auth.userid(headerAuth);
    if (!userId)
      return res.status(400).json({ 'error': 'mauvaise identification' });

      let title = req.body.title;
      let contenu = req.body.contenu;
      let imageURL = req.body.imageURL;

      let messageID = req.params.id;

    models.Message.findOne({
        attributes: ['id', 'title', 'contenu', 'imageURL'],
          where: { id: messageID, userId:userId },
        })
        
        .then(function(message) {
        
          if (message) {
           message.update({
            title:(title ? title : message.title),
            contenu: (contenu ? contenu: message.contenu),
            imageURL: (imageURL ? imageURL: message.imageURL),
             
           })
            return  res.status(201).json(message);
    
          } else {
            res.status(404).json({ 'error': 'mauvaise utilisateur' });
          }
      
        }).catch(function(err) {
          res.status(500).json({ 'error': 'Impossible d\'accéder au message' });
        });
        }

//Suppression d'un message
exports.deleteMessage= (req, res, next) => {
  let headerAuth = req.headers['authorization'];
  let userId = auth.userid(headerAuth);
    if (!userId)
      return res.status(400).json({ 'error': 'mauvaise identification' });

      let messageID = req.params.id;

    models.Message.findOne({
          where: { id: messageID, userId:userId },
        })
        
        .then((message) => {
            if (message.imageURL !== null) {
              let filename = user.photo.split("/images")[1];
              fs.unlink(`images/${filename}`, () => {
                // s'il y a une image, on supprimme tout
                models.Message.destroy({ where: { id: messageID } });
                res.status(200).json({ message: "message supprimé!" });
              });
            } else {
              // si pas d'image, on supprime l'utilisateur
              models.Message.destroy({ where: { id: messageID } }); 
              res.status(200).json({ message: "message supprimé!" });
            }
          })
          .catch(function(err) {
          res.status(500).json({ 'error': 'Impossible d\'accéder au message' });
        });
        }

//Récupération de tout les messages
exports.allMessage= (req, res, next) => {
  let headerAuth = req.headers['authorization'];
  let userId = auth.userid(headerAuth);
    if (!userId)
      return res.status(400).json({ 'error': 'mauvaise identification' });
    

models.Message.findAll({
    attributes:['id', 'title', 'contenu', 'imageURL', 'likes'],
    include: [{
        model: models.User,
        attributes: [ 'id', 'username', 'usersurname' ,'photoURL' ]
      }]
})
   .then((message) => {
    if (message) {
        return res.status(201).json({message});

    } else {
        return res.status(500).json({ 'error': 'Aucune publication!' });
    }
})
.catch((err) => res.status(500).json({ 'error': 'Une erreur est survenue!' }));

}



 