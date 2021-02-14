import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

   signupForm!: FormGroup;
   msgerror!: string;
  

  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private router :Router,
  
  ) { }

  ngOnInit() {
    this.initSignupForm();
  }
 
  initSignupForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
      username: ['', [Validators.required]],
      usersurname: ['', [Validators.required]],
    });
  }

  onSubmitSignupForm() {
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const username = this.signupForm.get('username')?.value;
    const usersurname = this.signupForm.get('usersurname')?.value;

    this.AuthService.signupUser(email, password, username, usersurname)
    .then(
        (data) => {
          this.router.navigate(['/post']);
          
          
        })
        .catch(
          (error) =>{
            this.msgerror = error.error;
          }
        )
  
  }
  

  }
  
