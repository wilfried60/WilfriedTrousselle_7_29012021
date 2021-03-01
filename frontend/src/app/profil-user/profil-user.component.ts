import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
  id:any = sessionStorage.getItem('userId');
  msg!: string;
  photoSrc!: string;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private AuthService: AuthService
    ) {   }

    
  ngOnInit(): void {
   
     // on affiche le profil de l'utilisateur
     this.AuthService.getOnUser(this.id).subscribe(
      (users: User)=>{
        this.FormGroup = new FormGroup({
         email: new FormControl (users.email), 
         username:  new FormControl (users.username),
         usersurname: new FormControl (users.usersurname),  
         description: new FormControl (users.description),  
         photoURL: new FormControl (users.photoURL),        
        })
    },



    
    (error) =>{
      this.errorMSG = error.error;
      console.log(this.users)
    }
    
    )  

  }
    
  onFileChange(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
        const file = (event.target as HTMLInputElement).files[0];   
      this.FormGroup.get('photoURL')?.setValue(file);
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.photoSrc = reader.result as string;
     
        this.FormGroup.patchValue({
          imageUrl: reader.result
        });
      };
   
    }
  }

  onSubmit() {
    const email = this.FormGroup.get('email')?.value;
    const username = this.FormGroup.get('username')?.value;
    const description = this.FormGroup.get('description')?.value;
    const usersurname = this.FormGroup.get('usersurname')?.value;
    const photoURL = this.FormGroup.get('photoURL')?.value;
    this.AuthService.updateUser(this.id, email, description, username, usersurname, photoURL)
    .subscribe(() => {
        console.log('le post est bien enregistré!'),
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
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('usersurname');
        window.location.reload();
      },
      (error) => {
        this.errorMSG = error.error;
      }
    )
      
    
  } 

  
}
