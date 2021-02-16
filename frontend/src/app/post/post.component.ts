import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';





@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  errorMSG:any;
  data: any;
  posts: any;
  postsUser: any;
 
  constructor(
    public PostService: PostService,

     ) { }
     
     

     ngOnInit() {
      this.PostService.getPostAll().subscribe(
        (posts)=>{
        this.posts = posts.message;
        console.log(this.posts);
      },
      (error) =>{
        this.errorMSG = error.error;
      }
      
      )  
           
        }
       
  };

 