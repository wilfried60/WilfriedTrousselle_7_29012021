import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isauth!: boolean;
  auths!: Subscription;

  constructor(

    private auth: AuthService,
    private cookieService: CookieService
    
    ) 
    { }

  ngOnInit() {

    // on vérifie si l'utilisateur est connecter afin de changer le menu
    this.auths = this.auth.authboolean.subscribe(
      (auth) => {
          this.isauth = auth;
          if (this.cookieService.get('userBoolean') == 'true') {
            this.isauth = true;
          }
       
      }
    );
  }

  
  
  signout() {
    this.auth.signoutUser();
    window.location.reload();
  }
  
  ngOnDestroy() {
    this.auths.unsubscribe();
  }


}
