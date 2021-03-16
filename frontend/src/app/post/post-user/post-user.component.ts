import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Post } from 'src/app/models/Post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.scss']
})
export class PostUserComponent implements OnInit {
  errorMSG!: string;
  posts:Post[] = [];
  FormGroup!: FormGroup;
  id:any = this.cookieService.get('idmessage');
  imageSRC!: string;
  title!: string;
  msg!:string;
  msgBoolean!:Boolean;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private PostService: PostService,
    private cookieService: CookieService
    ) {   }

    
  ngOnInit(): void { 
   
  // on affiche le post de l'utilisateur
  this.PostService.getonPost(this.id).subscribe(
    (posts: Post)=>{
      if (posts.message.title == 'null'){
        this.title = 'Décrivez-vous!';
      } else{
        this.title = posts.message.title ;
      }
      this.FormGroup = new FormGroup({
       title: new FormControl (posts.message.title), 
       contenu:  new FormControl (posts.message.contenu),
       imageURL: new FormControl (posts.message.imageURL),  
      })
      this.imageSRC = posts.message.imageURL;
      

  });
  
}

// on upload une image si celle-ci change
onFileChange(event:any) {
  const reader = new FileReader();
  if(event.target.files && event.target.files.length) {
      const file = (event.target as HTMLInputElement).files[0];   
    this.FormGroup.get('imageURL')?.setValue(file);
    reader.readAsDataURL(file);
  
    reader.onload = () => {
 
      this.imageSRC = reader.result as string;
   
      this.FormGroup.patchValue({
        imageUrl: reader.result
      });
    };
 
  }
}


// on envoie les nouvelle données
onSubmit() {
  const title = this.FormGroup.get('title')?.value;
  const contenu = this.FormGroup.get('contenu')?.value;
  const imageURL = this.FormGroup.get('imageURL')?.value;

  this.PostService.updatePost(this.id, title, contenu, imageURL)
  .subscribe(() => {
    this.msg = 'le post est bien modifié!';
    this.msgBoolean = true;
    }, (error) => {
      console.log(error.error);
  });
}
onPost() {
  this.router.navigate(['/post']);
}

}