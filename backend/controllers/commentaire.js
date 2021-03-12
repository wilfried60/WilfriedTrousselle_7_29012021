const models = require('../models');
const fs = require('fs');
const JWT = 'RANDOM_TOKEN_SECRET';
const jwt = require('jsonwebtoken');


//création d'un commentaire
exports.createcommentaire= (req, res, next) => {
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

      let commentaire = req.body.commentaire;
      let username = req.body.username;
      let usersurname = req.body.usersurname;
      let MessageId = req.params.id;
      let UserId = req.body.UserId;

      if (commentaire == ""  || username == null || usersurname == null  || MessageId == null || UserId == null){
        return res.status(400).json({'error': 'commentaire introuvable'})
         }

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

      models.Commentaire.findAll({
          attributes:['id', 'commentaire', 'username', 'usersurname', 'MessageId', 'UserId','createdAt'],
          include: [{
        model: models.User,
        attributes: [ 'id', 'username', 'usersurname' ,'photoURL', 'isAdmin' ]
      }]
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
       
          let commentaires = req.params.id;
        
          
    
          models.Commentaire.findOne({
            where: {id: commentaires},  
        })
    
           .then((commentaire) => {
            if (commentaire) {
               models.User.findOne({
                    where: { id: userId }
                })
                .then((user)=>{
                if(commentaire.UserId == userId || user.isAdmin == true){
                models.Commentaire.destroy({
                     where: { id: commentaires } 
                    })
                return res.status(200).json({ message: "Votre commentaire est bien supprimé!"});
            }else{
                return res.status(400).json({ 'error': 'Vous n\'avez pas les droits!' });
            }})
            .catch((err) => res.status(500).json({ 'error': 'Une erreur est survenue!' })); 

            } else {
                return res.status(400).json({ 'error': 'Aucun Commentaire à supprimer!' });
            }
        })
        .catch((err) => res.status(500).json({ 'error': 'Une erreur est survenue!' })); 
        
        }

       