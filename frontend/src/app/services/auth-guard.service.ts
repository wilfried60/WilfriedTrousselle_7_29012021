import { Injectable } from '@angular/core';
import { CanActivate, Router,  } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private auth: AuthService,
    private router: Router,
    private cookieService: CookieService
    ) {}
    
  canActivate(): boolean | Promise<boolean | boolean> {
    return new Promise(
      (resolve, reject) => {
        this.auth.authboolean.subscribe(
          (auth) => {
            if (auth || this.cookieService.get('token')) {
              resolve(true);
            } else {
              this.router.navigate(['/login']);
              resolve(false);
            }
           
      })});
    };

};