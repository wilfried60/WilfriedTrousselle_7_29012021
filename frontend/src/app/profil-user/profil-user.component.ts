import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss']
})
export class ProfilUserComponent implements OnInit {
  errorMSG!: string;
  users:User[] = [];
  FormGroup!: FormGroup;
  id:any = this.cookieService.get('userId');
  msg!: string;
  photoSrc!: string;
  isAdmintxt!: string;
  username!: string;
  usersurname!: string;
  description!: string;

  constructor(
    public formBuilder: FormBuilder, 
    private router: Router,
    private AuthService: AuthService,
    private cookieService: CookieService
    ) { }

   
    
  ngOnInit(): void {
   
     // on affiche le profil de l'utilisateur
     this.AuthService.getOnUser(this.id).subscribe(
      (users: User)=>{
        if (users.description == 'null'){
          this.description = 'Décrivez-vous!';
        } else{
          this.description = users.description;
        }
        this.FormGroup = new FormGroup({
         email: new FormControl (users.email), 
         username:  new FormControl (users.username),
         usersurname: new FormControl (users.usersurname),  
         description: new FormControl (this.description),  
         photoURL: new FormControl (users.photoURL),        
        })
        this.photoSrc = users.photoURL;
        this.username = users.username;
        this.usersurname = users.usersurname;
       
        if (users.isAdmin == true){
          this.isAdmintxt = 'Administrateur';
        } else{
          this.isAdmintxt = 'Membre';
        }
    
    },

    (error) =>{
      this.errorMSG = error.error;
      console.log(this.users)
    }
    
    )  

  }

  
    // on upload une nouvelle photo si celle-ci à changer
  onFileChange(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
        const file = (event.target as HTMLInputElement).files[0];   
      this.FormGroup.get('photoURL')?.setValue(file);
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.photoSrc = reader.result as string;
     
        this.FormGroup.patchValue({
          imageURL: reader.result
        });
      };
   
    }
  }
  // on envoie la modification du profil
  onSubmit() {
    const email = this.FormGroup.get('email')?.value;
    const username = this.FormGroup.get('username')?.value;
    const description = this.FormGroup.get('description')?.value;
    const usersurname = this.FormGroup.get('usersurname')?.value;
    const photoURL = this.FormGroup.get('photoURL')?.value;
    this.AuthService.updateUser(this.id, email, description, username, usersurname, photoURL)
    .subscribe(() => {
        console.log('le profil est bien enregistré!'),
        this.router.navigateByUrl('/post')
      }, (error) => {
        console.log(error.error);
    });
  }
 
  // suppression du profil
  deleteProfils() {
    this.AuthService.deleteProfil(this.id).subscribe(
      (data) => {
        console.log(data);
        this.msg = 'Compte supprimé';
        this.cookieService.delete('token'); 
        this.cookieService.delete('userId'); 
        this.cookieService.delete('username');
        this.cookieService.delete('usersurname');
        window.location.reload();
      },
      (error) => {
        this.errorMSG = error.error;
      }
    )
      
    
  } 

  
}
