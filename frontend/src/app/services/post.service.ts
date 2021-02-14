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
   

  getPostAll(): Observable<Post> {
    return this.httpClient.get<Post>('http://localhost:3000/api/users/message')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  create(post:any): Observable<Post> {
    return this.httpClient.post<Post>('http://localhost:3000/api/users/message', JSON.stringify(post))
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  getById(id: string): Observable<Post> {
    return this.httpClient.get<Post>('http://localhost:3000/api/users/message' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: string, post: any): Observable<Post> {
    return this.httpClient.put<Post>('http://localhost:3000/api/users/message' + id, JSON.stringify(post),)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: string){
    return this.httpClient.delete<Post>('http://localhost:3000/api/users/message' + id,)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       
       errorMessage = error.error.message;
     } else {
      
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
};

