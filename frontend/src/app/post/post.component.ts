import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commentaire } from '../models/commentaire';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  
  errorMSG!:string;
  posts: any;
  userid!:any;
  msg!: string;
  FormGroup!: FormGroup;
  commentaires!: any;

  constructor(
    public formBuilder: FormBuilder,
    public PostService: PostService,
   
     ) {
      this.FormGroup = this.formBuilder.group({
  
        commentaire: ['',Validators.required],
        username:[''],
        usersurname:[''],
        MessageId:[''],
        UserId:['']
      })
      }
     
     

     ngOnInit() {


      this.PostService.getPostAll().subscribe(
        (posts)=>{
        
        this.posts = posts.message;
    
        this.userid = sessionStorage.getItem('userId');
      },
      (error) =>{
        this.errorMSG = error.error;
      }
      
      )  

      // on affiche tout les commentaires
      this.PostService.getCommentaireAll().subscribe(
        (commentaires)=>{
        
        this.commentaires = commentaires.commentaire;
        
      },
      (error) =>{
        this.errorMSG = error.error;
      }
      
      )  

        }

        deletePostU(id: number) {
          this.PostService.deletePost(id).subscribe(
            (data) => {
              console.log(data.message);
              this.msg = 'votre post est bien supprimé';
              window.location.reload();
            },
            (error) => {
              this.errorMSG = error.error;
            }
          )
            
          
        } 

        onSubmitcomment(id: number ) {
          const commentaire = this.FormGroup.get('commentaire')?.value;
          const username = sessionStorage.getItem('username')!;
          const usersurname = sessionStorage.getItem('usersurname')!;
          const UserId = sessionStorage.getItem('userId')!;
          this.PostService.createcomment(id, commentaire, username, usersurname, UserId )
          .subscribe(() => {
            window.location.reload();
           
            }, (error) => {
              console.log(error.error);
          });
        }

        deletecommentaire(id: number) {
          this.PostService.deleteComment(id).subscribe(
            (data) => {
              console.log(data.commentaire);
              this.msg = 'votre post est bien supprimé';
              window.location.reload();
            },
            (error) => {
              this.errorMSG = error.error;
            }
          )
            
          
        } 
};
 