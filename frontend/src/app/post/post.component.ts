import { Component, OnInit} from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  
  subscription!: Subscription;
  errorMSG!:string;
  posts: any;
  users:User[] = [];
  userid:any = this.cookieService.get('userId');
  msg!: string;
  FormGroup!: FormGroup;
  commentaires!: any;
  postBoolean!: boolean;
  messageId!:number;
  likes!:any;
  likesnumber!:number;
  msgBoolean: boolean;
  idmessage: number;
  msgComment: string;
  commentBoolean: boolean;
  idCommentaire: number;
  commentsBoolean: boolean;
  msgComments: string;
  idmessageLike: number;
  msgBooleanLike: boolean;
  msgLike: string;
  placeholder: string;
  isAdmin: boolean;
  photoUrl: string;
  username: string;
  usersurname: string;

  
  
  constructor(
    public formBuilder: FormBuilder,
    public PostService: PostService,
    private router : Router,
    private AuthService: AuthService,
    private cookieService: CookieService,
   
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
    

     
      
       // on affiche tout les likes
       this.PostService.getLikePost().subscribe(
        (likes)=>{
        this.likes = likes.like; 
      },
      (error) =>{
        this.errorMSG = error.error;
      }
      
      )  


      // on récupère les données d'admin de l'utilisateur
     this.AuthService.getOnUser(this.userid).subscribe(
      (users: User)=>{
        this.isAdmin = users.isAdmin;
        this.photoUrl = users.photoURL;
        this.username = users.username;
        this.usersurname = users.usersurname;
        
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
              this.msg = 'votre post est bien supprimé!';
              this.msgBoolean = true;
              this.idmessage = id;
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
            this.msgComments = 'votre commentaire est bien ajouté!';
              this.commentsBoolean = true;
              this.idCommentaire = id;
             
            }, (error) => {
              console.log(error.error);
          });
        
        }
        
        // l'utilisateur supprime son commentaire

        deletecommentaire(id: number) {
          this.PostService.deleteComment(id).subscribe(
            () => {
              console.log('votre Commentaire est bien supprimé');
              this.msgComment = 'votre commentaire est bien supprimé!';
              this.commentBoolean = true;
              this.idCommentaire = id;
              
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
                 this.msgLike = 'vous aimez cette publication!';
                  this.msgBooleanLike = true;
                   this.idmessageLike = id;
                  
              } else if (data.like == 0 && MessageId == data.messageid){
                this.messageId = MessageId;
                this.msgLike = 'vous n\'aimez plus cette publication!';
                this.msgBooleanLike = true;
                 this.idmessageLike = id; 
               
              }else{
                this.messageId = MessageId;
                console.log('impossible de liker!');
              }
              console.log(data.like, this.messageId);
              }, (error) => {
                console.log(error.error);
            });
          }   
           
          // on recupère les posts après suppression d'un post
          onPost() {
            this.PostService.getPostAll();
          }
          
          // on recupère les posts et commentaires après suppression d'un commentaire
          onComment() {
            this.PostService.getCommentaireAll().subscribe(
              (commentaires)=>{
              this.commentaires = commentaires.commentaire;
             
            },
            (error) =>{
              this.errorMSG = error.error;
            }
            )  
            this.PostService.getPostAll();
            this.commentBoolean = false;
            this.commentsBoolean = false;
            this.FormGroup.reset();
            
           
          }
          
           // on récupère tout les likes
          onLike(){
           
            this.PostService.getLikePost().subscribe(
              (likes)=>{
                this.likes = likes.like; 
             },
                 (error) =>{
                 this.errorMSG = error.error;
             })  
              this.PostService.getPostAll();
              this.msgBooleanLike = false;
          }
          
};

 