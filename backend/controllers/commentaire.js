const models = require('../models');
const auth = require('../middleware/auth');
const fs = require('fs');


//création d'un commentaire
exports.createcommentaire= (req, res, next) => {
    let headerAuth = req.headers['authorization'];
    let userId = auth.userid(headerAuth);
    if (!userId)
      return res.status(400).json({ 'error': 'mauvaise identification' });

      let commentaire = req.body.commentaire;
      let username = req.body.username;
      let usersurname = req.body.usersurname;
      let MessageId = req.params.id;

     models.Message.findOne({
        where: { id: MessageId}
    })

    .then((message) => {
        if (message) {
            models.Commentaire.create({
                commentaire: commentaire,
                username: username,
                usersurname: usersurname,
                MessageId: MessageId,
                UserId: userId        
            });

            return res.status(201).json({ message: 'votre commentaire est bien ajouté!'});
    
        } else {
         
            return res.status(200).json({ 'error': 'Message introuvable!'});
        }
        
    })
    .catch((err) => res.status(500).json({ 'error': 'Une erreur est survenue!' })) ;
    
    

}

// affichage des commentaire d'un message
exports.getcommentaire= (req, res, next) => {
    let headerAuth = req.headers['authorization'];
    let userId = auth.userid(headerAuth);
    if (!userId)
      return res.status(400).json({ 'error': 'mauvaise identification' });

      let MessageId = req.params.id;

      models.Commentaire.findAll({
          attributes:['id', 'commentaire', 'username', 'usersurname', 'MessageId', 'UserId'],
        where: {MessageId: MessageId },  
    })

       .then((commentaire) => {
        if (commentaire) {
            return res.status(200).json({commentaire});
    
        } else {
            return res.status(500).json({ 'error': 'Aucun Commentaire!' });
        }
    })
    .catch((err) => res.status(500).json({ 'error': 'Une erreur est survenue!' })); 
    
    }

    //supression du commentaire
    exports.deletecommentaire= (req, res, next) => {
        let headerAuth = req.headers['authorization'];
        let userId = auth.userid(headerAuth);
        if (!userId)
          return res.status(400).json({ 'error': 'mauvaise identification' });
    
          let commentaires = req.params.id;
          let message = req.body.messageid;
         
    
          models.Commentaire.findOne({
            where: {id: commentaires, UserId: userId, MessageId : message},  
        })
    
           .then((commentaire) => {
            if (commentaire) {
                models.Commentaire.destroy({
                     where: { id: commentaires, UserId: userId, MessageId : message } 
                    })
                return res.status(200).json({ message: "Votre commentaire est bien supprimé!"});
        
            } else {
                return res.status(400).json({ 'error': 'Aucun Commentaire à supprimer!' });
            }
        })
        .catch((err) => res.status(500).json({ 'error': 'Une erreur est survenue!' })); 
        
        }

       