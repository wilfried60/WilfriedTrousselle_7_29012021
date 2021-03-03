const models = require('../models');
const auth = require('../middleware/auth');


// mise en place d'un like
exports.like= (req, res, next) => {
    let headerAuth = req.headers['authorization'];
    let userId = auth.userid(headerAuth);
    if (!userId)
      return res.status(400).json({ 'error': 'mauvaise identification' });

      let messageID = req.params.id;

     models.Message.findOne({
        where: { id: messageID },
        
    })
    .then((message) => {
    if (message) {
      models.Like.findOne({
        where: { UserId: userId, MessageId: messageID },
  
    })

       .then((user) => {

          if (user) {
            models.Like.destroy({
                where: { UserId: userId, MessageId: messageID },           
            });
             
            message.update({
                likes: message.likes -1
            });

            return res.status(200).json({ 'like': 0,
                                           'messageid': messageID});
    
        } else {
            models.Like.create({
                UserId: userId, 
                MessageId: messageID,
               
            });

            message.update({
                likes: message.likes +1
            });
           
            return res.status(201).json({ 'like': 1,
                                         'messageid': messageID});
        }

        
        
    })
    .catch((err) => res.status(500).json({ 'error': 'Une erreur est survenue!' })) ;
    
    
} else {
   return res.status(400).json({ 'error': 'Le message n\'existe pas!' }) ;
}

    })
    .catch((err) => res.status(500).json({ 'error': 'Une erreur est survenue!' })) ;

}

//Récupération des likes
exports.getlike= (req, res, next) => {
    let headerAuth = req.headers['authorization'];
    let userId = auth.userid(headerAuth);
    if (!userId)
      return res.status(400).json({ 'error': 'mauvaise identification' });

        models.Like.findAll({
            attributes:['id', 'MessageId', 'UserId'],
           
      })
  
         .then((like) => {
          if (like) {
              return res.status(200).json({like});
      
          } else {
              return res.status(500).json({ 'error': 'Aucun Commentaire!' });
          }
      })
      .catch((err) => res.status(500).json({ 'error': 'Une erreur est survenue!' })); 
      
      }
  
  

    

    
