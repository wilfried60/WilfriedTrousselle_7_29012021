import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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
  likesBoolean!: boolean;
  messageId!:number;
  likes!:any;
  likesnumber!:number;

  constructor(
    public formBuilder: FormBuilder,
    public PostService: PostService,
    private router : Router
   
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

       // on affiche tout les posts
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

      // on affiche tout les likes
      this.PostService.getLikePost().subscribe(
        (likes)=>{
        
        this.likes = likes.like;
          
      },
      (error) =>{
        this.errorMSG = error.error;
      }
      
      )  

        }

        // modification du post
        PostUpdate(id:string) {
          this.router.navigate(['/post/post-user',id]);
          sessionStorage.setItem('idmessage', id);
        }
      

        // l'utilisateur supprime son post

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

        // l'utilisateur envoie un commentaire au post

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
        
        // l'utilisateur supprime son commentaire

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

          // l'utilisateur Like un post

          LikePosts(id: number ) {
            const MessageId = id;
            const UserId = sessionStorage.getItem('userId')!;
            this.PostService.LikePost(id, MessageId, UserId )
            .subscribe((data:any) => {
             
              if (data.like == 0 && MessageId == data.messageid) {
                this.messageId = MessageId;
                this.likesBoolean = false;
                
              } else if (data.like == 1 && MessageId == data.messageid){
                this.likesBoolean = true;
                this.messageId = MessageId;
              }
              console.log(this.likesBoolean, this.messageId);
              }, (error) => {
                console.log(error.error);
            });
          }
  
          
};

 