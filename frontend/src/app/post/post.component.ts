import { Component, OnInit} from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  
  subscription!: Subscription;
  errorMSG!:string;
  posts: any;
  userid:any = this.cookieService.get('userId');
  msg!: string;
  FormGroup!: FormGroup;
  commentaires!: any;
  likesBoolean!: boolean;
  postBoolean!: boolean;
  messageId!:number;
  likes!:any;
  likesnumber!:number;
  
  constructor(
    public formBuilder: FormBuilder,
    public PostService: PostService,
    private router : Router,
    private cookieService: CookieService
   
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
       this.subscription = this.PostService.postSubject.subscribe(
        (posts) => {
          console.log(posts);
          this.posts = posts.message;
          this.userid ;

          if (this.posts == ''){
            this.postBoolean = false;
            this.msg = 'aucun post n\'est publié!';
          } else {
            this.postBoolean = true;
           
          }
        },
        (error) => {
          console.log(error);
          this.errorMSG = error.error;
        }
      );
         
      this.PostService.getPostAll();
     
     
    
  

      // on affiche tout les commentaires
      this.PostService.getCommentaireAll().subscribe(
        (commentaires)=>{
        
        this.commentaires = commentaires.commentaire;
        
      },
      (error) =>{
        this.errorMSG = error.error;
      }
      
      )  
      this.PostService.getCommentaireAll();

     
      
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
          this.cookieService.set('idmessage', id, 1);
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
          const username = this.cookieService.get('username');
          const usersurname = this.cookieService.get('usersurname');
          const UserId = this.cookieService.get('userId');
          this.PostService.createcomment(id, commentaire, username, usersurname, UserId)
          .subscribe(() => {
            window.location.reload();
           
            }, (error) => {
              console.log(error.error);
          });
        }
        
        // l'utilisateur supprime son commentaire

        deletecommentaire(id: number) {
          this.PostService.deleteComment(id).subscribe(
            () => {
              console.log('votre Commentaire est bien supprimé');
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
            const UserId = this.cookieService.get('userId')!;
            this.PostService.LikePost(id, MessageId, UserId )
             .subscribe((data:any) => {
             
              if (data.like == 1 && MessageId == data.messageid) {
                this.messageId = MessageId;
                this.likesBoolean = true;
                
                  
              } else if (data.like == 0 && MessageId == data.messageid){
                this.likesBoolean = false;
                this.messageId = MessageId;
           
              }
              console.log(this.likesBoolean, this.messageId);
              }, (error) => {
                console.log(error.error);
            });
         
          }   
          
};

 