import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.scss']
})
export class PostUserComponent implements OnInit {
  
  errorMSG!: string;
  posts!:any[];
  FormGroup!: FormGroup;
  id:any = sessionStorage.getItem('idmessage');

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private PostService: PostService
    ) {   }

    
  ngOnInit(): void {
   
     // on affiche tout les posts
     this.PostService.getonPost(this.id).subscribe(
      (posts)=>{
        this.FormGroup = new FormGroup({
         title: new FormControl (posts.message.title), 
         contenu:  new FormControl (posts.message.contenu)       
        })
    },
    (error) =>{
      this.errorMSG = error.error;
      console.log(this.posts)
    }
    
    )  

  }
    


  onSubmit() {
    const title = this.FormGroup.get('title')?.value;
    const contenu = this.FormGroup.get('contenu')?.value;

    this.PostService.updatePost(this.id, title, contenu)
    .subscribe(() => {
        console.log('le post est bien modifié!'),
        this.router.navigate(['/post'])
      }, (error) => {
        console.log(error.error);
    });
  }


  
}