import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Commentaire } from '../models/commentaire';
import { Likes, LikesAll } from '../models/like';
import { Post } from '../models/Post.model';




@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(
    private httpClient: HttpClient,
  ) { }
  
  postSubject = new Subject<any>();
 
   
  ///////////////////////////////////////// partie post ////////////////////////////////////////
   
  //on récupère les posts
  getPostAll(){
    this.httpClient.get('http://localhost:3000/api/users/message').subscribe(
      (posts:any) => {
        this.postSubject.next(posts);
      },
      (error) => {
        this.postSubject.next([]);
        console.error(error.error);
       
      }
    );
  }

   //on récupère un post
   getonPost(id:number): Observable<Post> {
    return this.httpClient.get<Post>('http://localhost:3000/api/users/message/'+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  //on créer un post
  createPost(title:string, contenu:string, image:File): Observable<Post> {
    const formData = new FormData();
      formData.append('title', (title));
      formData.append('contenu', (contenu));
      formData.append('imageURL', image);
    return this.httpClient.post<Post>('http://localhost:3000/api/users/message/', formData)
    .pipe(
      catchError(this.errorHandler)
    ) 
  }  
  
  //l'utilisateur modifie son post
  updatePost(id: number, title:string, contenu:string, imageURL:File): Observable<Post> {
    const formData = new FormData();
      formData.append('title', (title));
      formData.append('contenu', (contenu));
      formData.append('imageURL', imageURL);
    return this.httpClient.put<Post>('http://localhost:3000/api/users/message/' + id, formData)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  // l'utilisateur supprime son post
  deletePost(id: number, ){
    return this.httpClient.delete<Post>('http://localhost:3000/api/users/message/' + id)
    .pipe(    
      catchError(this.errorHandler)
    )
  }

  ///////////////////////////// partie commentaire//////////////////////////////////////////////

   //on créer un commentaire
   createcomment(id:number, commentaire: string, username:string, usersurname:string, UserId:string): Observable<Commentaire> {
     console.log(id,commentaire, username, usersurname, UserId)
    return this.httpClient.post<Commentaire>('http://localhost:3000/api/users/' + id +'/commentaire', {commentaire, username, usersurname, UserId})
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  //on récupère les commentaires
  getCommentaireAll(): Observable<Commentaire> {
    return this.httpClient.get<Commentaire>('http://localhost:3000/api/users/commentaire/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

   // l'utilisateur supprime son commentaire
   deleteComment(id: number){
     console.log(id)
    return this.httpClient.delete<Commentaire>('http://localhost:3000/api/users/commentaire/' + id)
    .pipe(    
      catchError(this.errorHandler)
    )
  }
  


  ///////////////////////////////////////// partie Like ////////////////////////////

  // L'utilisateur like un poste

  LikePost(id:number,MessageId: number, UserId:string):Observable<Likes>{
    console.log(id)
    return this.httpClient.post<Likes>('http://localhost:3000/api/users/message/' + id +'/like', {MessageId, UserId})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // On récupère les likes d'un poste

  getLikePost():Observable<LikesAll>{
    return this.httpClient.get<LikesAll>('http://localhost:3000/api/users/like')
    .pipe(
      catchError(this.errorHandler)
    )
  }
   // on renvoie l'erreur du serveur
  errorHandler(error:any) {
     let errorMessage = '';
       errorMessage = error.error;
     console.log(errorMessage);
     return throwError(errorMessage);
  }
};

