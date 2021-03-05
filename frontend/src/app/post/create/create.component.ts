import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';




@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  CreateForm!: FormGroup;
  msgerror!: string;
  msg!:string;
  msgBoolean!:Boolean;
  imageSrc!: string;
  FormGroup = new FormGroup({
    title: new FormControl (''),
      contenu: new FormControl ('',[Validators.required]),
        imageURL: new FormControl('')
  });

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private postService: PostService
    ) {  }

  ngOnInit(): void {
  
  }
 
   // on upload et affiche l'image en preview
  onFileChange(event:any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
        const file = (event.target as HTMLInputElement).files[0];   
      this.FormGroup.get('imageURL')?.setValue(file);
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.FormGroup.patchValue({
          imageUrl: reader.result
        });
      };
   
    }
  }

  // on envoie les données du formulaire
  onSubmitCreateForm() {
    const title = this.FormGroup.get('title')?.value;
    const contenu = this.FormGroup.get('contenu')?.value;
    const imageURL = this.FormGroup.get('imageURL')?.value;
    this.postService.createPost(title, contenu, imageURL)
    .subscribe(() => {
        this.msg = 'le post est bien enregistré!';
        this.msgBoolean = true;
      }, (error) => {
        this.msgerror = error.error;
    });
  }
  onPost() {
    this.router.navigate(['/post']);
  }
  

  

}