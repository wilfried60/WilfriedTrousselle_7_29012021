import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { PostComponent } from './post/post.component';
import { PostUserComponent } from './post/post-user/post-user.component';
import { CguComponent } from './cgu/cgu.component';
import { ProfilUserComponent } from './profil-user/profil-user.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS ,HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './post/create/create.component';
import { tokenInterceptor } from './interceptors/token-interceptor';


const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'post', canActivate:[AuthGuardService], component: PostComponent},
  {path: 'post/post-user/:id', canActivate:[AuthGuardService], component: PostUserComponent},
  {path: 'post/create', canActivate:[AuthGuardService],component: CreateComponent},
  {path: 'profil-user', canActivate:[AuthGuardService],component: ProfilUserComponent},
  {path: 'cgu', component: CguComponent},
  {path: '', redirectTo:"auth/signin", pathMatch: 'full'},
  {path: '**', redirectTo:"auth/signin"},
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    PostComponent,
    PostUserComponent,
    CguComponent,
    ProfilUserComponent,
    HeaderComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [
    AuthService,
    PostService,
    AuthGuardService,
    {  provide: HTTP_INTERCEPTORS,
      useClass: tokenInterceptor,
      multi: true
   },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
