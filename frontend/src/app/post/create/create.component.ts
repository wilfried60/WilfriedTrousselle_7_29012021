import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';




@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  
  FormGroup!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private postService: PostService
    ) { 
      this.FormGroup = this.formBuilder.group({
  
        title: [''],
        contenu:['', [Validators.required]],
       
      
      })
    }

  ngOnInit(): void {
  }

  onSubmit() {
    const title = this.FormGroup.get('title')?.value;
    const contenu = this.FormGroup.get('contenu')?.value;

    this.postService.createPost(title, contenu)
    .subscribe(() => {
        console.log('le post est bien enregistré!'),
        this.router.navigateByUrl('/post')
      }, (error) => {
        console.log(error.error);
    });
  }


}