
export class Post{
    message!: [{
        id: string;
        title: string;
        contenu: string;
        imageURL: string;
        createdAt: string;
        updatedAt: string;

        User:[{
            id: string;
            username: string;
            usersurname: string;
            photoURL: string;
        }];
    }];
        
    
};