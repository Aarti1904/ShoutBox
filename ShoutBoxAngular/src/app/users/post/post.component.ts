import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Comments } from 'src/app/models/comments';
import { Shout } from 'src/app/models/shout';
import { CommentsService } from 'src/app/services/comments.service';
import { ShoutService } from 'src/app/services/shout.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';
import { isJSDocThisTag } from 'typescript';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
 
  comment:string="";
    user:any;
    id:any;
    shout:any;
    frdlist:any;
    userFriendList:string[]=[];
    allShouts:Shout[]=[];
    shouts:Shout;
    allUsers:any;
    flag:boolean=false;
    b:any;
    a:any;
    date:Date=new Date();
    likes!:number;
    allComments:Comments[]=[];
    commentUsers:any=[];
   imageUrl:any;
   
    

    constructor(private SpinnerService: NgxSpinnerService,private userService:UserServiceService, private http:HttpClient, private shoutService:ShoutService, private commentService:CommentsService) { 
     this.shouts=new Shout();
     this.allUsers=[];
    }
    

  ngOnInit(): void {
    this.SpinnerService.show();  
    this.id=sessionStorage.getItem("userId");
    this.getAllUsers();
    this.getUserByID();
    this.getAllShouts();
    this.getAllComments();
    this.SpinnerService.hide();  
   
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(data => {      
      this.allUsers = data;
       });
    
  }

  getUserByID(){

    this.userService.getUserById(this.id).subscribe(data => {
      console.log("got"+JSON.stringify(data));
      this.user = data;
      this.frdlist=this.user.friends;
      this.userFriendList = this.frdlist.split(",");
      this.userFriendList.push(this.user.id);
     this.imageUrl=this.user.userProfile;
    },
    error=>{
      console.log(error);
    });
  }

  getAllShouts(){
    this.shoutService.getAllShouts().subscribe(data => {
      
      console.log("got"+JSON.stringify(data));
      this.shout = data;
      
      for(var i=0;i<this.userFriendList.length;i++){
        for(var j=0;j<this.shout.length;j++)
        {
           if(this.userFriendList[i]==this.shout[j].userId)
           {
            
             for( var k=0;k<this.allUsers.length;k++)
             {
               if(this.shout[j].userId==this.allUsers[k].id)
               {
                   this.shout[j].userProfile=this.allUsers[k].userProfile;
                  
               }
             }
             this.allShouts.push(this.shout[j]);
             
            this.allShouts.sort((a,b) => 0 - (a.created_at > b.created_at ? 1 : -1));
          
           

           }
           
        }
        console.log(this.allShouts);
    }  
    },
    error=>{
      console.log(error);
    });   
  }




  getAllComments(){
    this.allComments=[];
    this.commentService.getAllComments().subscribe(
      data=>{
         var coms:any;
         coms=data;
         // console.log(data);
          for(var j=0;j<coms.length;j++)
          {
              this.allComments.push(coms[j]);
          }
          console.log(this.allComments);
      //     for(var i=0;i<this.allComments.length;i++){
      //       if(this.commentUsers.filter((comment:any) => {
      //         return comment.userId == this.allComments[i].userId;
      //       }))
      //       this.commentUsers.push(this.allUsers[i]);
      //     }
      //     console.log("Comment Users"+this.commentUsers);
       }
    );
   
  }


  like(shout:any)
  {
    const myElement: HTMLElement | null = document.getElementById(shout.id);
    if(myElement!=null){
      var results = this.allShouts.findIndex(x => x.id ===shout.id);
      shout.likes++;
      this.allShouts[results].likes=shout.likes;
    myElement.innerHTML=shout.likes.toString();
    //.log(id);
  console.log(shout.likes);
  }
  
  var temp={
    'id':shout.id,
    'likes':shout.likes
  }

  this.shoutService.likeShout(temp).subscribe(data => {
  console.log(data);
  });
    
  }

    dislikes(shout:any)
  {
    const myElement: HTMLElement | null = document.getElementById('dis'+shout.id);
    if(myElement!=null){
      var results = this.allShouts.findIndex(x => x.id ===shout.id);
      shout.dislikes++;
      this.allShouts[results].dislikes=shout.dislikes;
      myElement.innerHTML=(shout.dislikes).toString();
      //.log(id);
      console.log(shout.dislikes);
  }
  
  var temp={
    'id':shout.id,
    'dislikes':shout.dislikes
  }

  this.shoutService.dislikeShout(temp).subscribe(data => {
    //this.likes=data.like

  });
    
  }

  addComment(comments:NgForm,shoutid:any){
    
    const myElement = ((document.getElementById("comment"+shoutid) as HTMLInputElement).value);
    if(myElement.length>0){
      var temp={
        'shoutId':shoutid,
        'comment':myElement
      }
      this.commentService.addComment(temp, this.id).subscribe(
        data=>{
               
          if(myElement!=null){
            const myElement = ((document.getElementById("comment"+shoutid) as HTMLInputElement).value)="";
          }
          this.getAllComments();
        },
        error=>{
          Swal.fire({
            title: 'Comment failed!',
            text:   " Cannot repost comment!",
            icon: 'error',
            timer:2000
          })
          const myElement = ((document.getElementById("comment"+shoutid) as HTMLInputElement).value)="";
        }
      );
    }
  }

  likeComment(comment:any){
    const myElement: HTMLElement | null = document.getElementById("com"+comment.id);
    if(myElement!=null){
      var results = this.allComments.findIndex(x => x.id ===comment.id);
      comment.likes++;
     // this.allComments[results].likes=comment.likes;
    myElement.innerHTML=(comment.likes).toString();
    //.log(id);
  console.log(comment.likes);
  }
  
  var temp={
    'id':comment.id,
    'likes':comment.likes
  }

  this.commentService.likeComment(temp).subscribe(data => {
  console.log(data);
  });
    
  }

  report(reportForm:NgForm,shoutid:any)
  {
    const myElement = ((document.getElementById("report"+shoutid) as HTMLInputElement).value);
  if(myElement.length>0){
    var temp={
      'shoutId':shoutid,
      'userId':this.id,
      'reportDescription':myElement
    }
    console.log(temp);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, report it!'
    }).then((result) => {
      if (result.isConfirmed) {
       
        this.shoutService.addreport(temp).subscribe(
          data=>{
            console.log(data);
            Swal.fire(
              'Reported!',
              'This post has been reported by you.',
              'success'
            )
          },
          error=>{
            console.log(error);
          }
        );
        
      }
    })
  }
}
 
}


