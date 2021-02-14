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
       
      }
    );
  }

  signout() {
    this.auth.signoutUser();
  }

  ngOnDestroy() {
    this.auths.unsubscribe();
  }


}
