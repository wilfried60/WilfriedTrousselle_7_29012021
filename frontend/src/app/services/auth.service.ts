import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private userId!: number;

  constructor(
    private httpClient: HttpClient,
    private router: Router, 
  ) { }
  
  authboolean = new BehaviorSubject<boolean>(false);


  // l'utilisateur s'inscrit
  signupUser( email:string, password: string, username:string, usersurname:string) {
    
    return new Promise((resolve, reject) =>{
      this.httpClient.post('http://localhost:3000/api/users/register',  {email, password, username, usersurname}).subscribe(
       () => {
          this.authboolean.next(true);
         
          resolve({message:'Le compte est créer!'});
        },
        (error) => {
          reject(error.error);
        })
        }
      );
  }
 
  // L'utilisateur se connecte
  signinUser( email:string, password: string) {
    return new Promise<void>((resolve, reject) =>{
      this.httpClient.post('http://localhost:3000/api/users/login',  {email, password}).subscribe(
        (data:any) => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('usersurname', data.usersurname);
        this.userId =  data.userId;
        this.authboolean.next(true);
          resolve();
        },
        (error) => {
          reject(error.error);
        })
        }
      );
  }

  // on récupère l'utilisateur

  getOnUser(id:number): Observable<User> {
    return this.httpClient.get<User>('http://localhost:3000/api/users/profil/'+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //l'utilisateur modifie son post
  updateUser(id: number, email:string, description: string, username:string, usersurname:string, photoURL:File): Observable<User> {
    const formData = new FormData();
    formData.append('email', (email));
    formData.append('description', (description));
    formData.append('photoURL', photoURL);
    formData.append('username', username);
    formData.append('usersurname', usersurname);

    return this.httpClient.put<User>('http://localhost:3000/api/users/profil/' + id, formData)
    .pipe(
      catchError(this.errorHandler)
    )
  }

   // Supression de l'utilisateur
   deleteProfil(id: number){
    return this.httpClient.delete<User>('http://localhost:3000/api/users/profil/' + id)
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


  signoutUser(){
    this.authboolean.next(false);
    sessionStorage.removeItem( "token" ) ;
    sessionStorage.removeItem( "userId" ) ;
  }

  
}