
export interface Post{
    message: {
        id: number;
        title: string;
        contenu: string;
        imageURL: string;
        likes:number;
        createdAt: string;
        updatedAt: string;

        User:[{
            id: number;
            username: string;
            usersurname: string;
            photoURL: string;

           
        }];
    };
    
};