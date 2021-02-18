import { Injectable } from '@angular/core';
import { CanActivate, Router,  } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private auth: AuthService,
    private router: Router
    ) {}
    
  canActivate(): boolean | Promise<boolean | boolean> {
    return new Promise(
      (resolve, reject) => {
        this.auth.authboolean.subscribe(
          (auth) => {
            if (auth || sessionStorage.getItem("token")) {
              resolve(true);
            } else {
              this.router.navigate(['/login']);
              resolve(false);
            }
           
      })});
    };

};