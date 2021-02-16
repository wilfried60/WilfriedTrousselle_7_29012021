import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(
    private http: HttpClient,
    private router: Router, 
  ) { }
  
  authboolean = new BehaviorSubject<boolean>(false);
  signupUser( email:string, password: string, username:string, usersurname:string) {
    
    return new Promise((resolve, reject) =>{
      this.http.post('http://localhost:3000/api/users/register',  {email, password, username, usersurname}).subscribe(
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
 

  signinUser( email:string, password: string) {
    return new Promise<void>((resolve, reject) =>{
      this.http.post('http://localhost:3000/api/users/login',  {email, password}).subscribe(
        (data:any) => {
        sessionStorage.setItem('token', data.token);
        this.authboolean.next(true);
          resolve();
        },
        (error) => {
          reject(error.error);
        })
        }
      );
  }

  signoutUser(){
    this.authboolean.next(false);
    sessionStorage.removeItem( "token" ) ;
  }

  
}