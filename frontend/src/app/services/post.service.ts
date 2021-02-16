import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../models/Post.model';




@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(
    private httpClient: HttpClient,
  ) { }
   
  //on récupère les posts
  getPostAll(): Observable<Post> {
    return this.httpClient.get<Post>('http://localhost:3000/api/users/message')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  //on créer un post
  createPost(post:any): Observable<Post> {
    return this.httpClient.post<Post>('http://localhost:3000/api/users/message', post)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  //on récupère le post de l'utilisateur
  getPostById(id: string): Observable<Post> {
    return this.httpClient.get<Post>('http://localhost:3000/api/users/message' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  //l'utilisateur modifie son post
  updatePost(id: string, post: any): Observable<Post> {
    return this.httpClient.put<Post>('http://localhost:3000/api/users/message' + id, post)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  // l'utilisateur supprime son post
  deletePost(id: string){
    return this.httpClient.delete<Post>('http://localhost:3000/api/users/message' + id,)
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

