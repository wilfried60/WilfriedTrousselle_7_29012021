import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

 
  constructor(
    public PostService: PostService,
    private AuthService: AuthService,
    private router: Router, 
     ) { }
     
     

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
};
 