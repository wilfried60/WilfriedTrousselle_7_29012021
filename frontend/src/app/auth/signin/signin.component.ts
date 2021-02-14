
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;
  msgerror!: string;


  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private router :Router,
  
  ) { }

  ngOnInit() {
    this.initSigninForm();
  }
 
  initSigninForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmitSigninForm() {
    const email = this.signinForm.get('email')?.value;
    const password = this.signinForm.get('password')?.value;
  

    this.AuthService.signinUser(email, password).then(
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
  

