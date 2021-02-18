import { Component, OnInit } from '@angular/core';
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

    private auth: AuthService
    
    ) 
    { }

  ngOnInit() {
    this.auths = this.auth.authboolean.subscribe(
      (auth) => {
          this.isauth = auth;
          if (sessionStorage.getItem("token")) {
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
