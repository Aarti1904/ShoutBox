import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';


import { Shout } from 'src/app/models/shout';
import { User } from 'src/app/models/user';
import { ShoutService } from 'src/app/services/shout.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { isJSDocThisTag } from 'typescript';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
 
  
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
    
    
    //date.setDate(date.getDate() + 27);
    

    constructor(private userService:UserServiceService, private http:HttpClient, private shoutService:ShoutService) { 
     this.shouts=new Shout();
     this.allUsers=[];
    }
<<<<<<< HEAD
    
=======
>>>>>>> 3f7a13b134f0d913e6422037ab4b2e39e482a354

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {      
      this.allUsers = data;   

       }
    );
<<<<<<< HEAD
    
    this.id=sessionStorage.getItem("userId");
  console.log(this.shouts);
    this.userService.getUserById(this.id).subscribe(data => {
      console.log("got"+JSON.stringify(data));
      this.user = data;
      this.frdlist=this.user.friends;
      this.userFriendList = this.frdlist.split(",");
      this.userFriendList.push(this.user.id);
     
    },
    error=>{
      console.log(error);
    });
   

    this.shoutService.getAllShouts().subscribe(data => {
      
      console.log("got"+JSON.stringify(data));
      this.shout = data;
      //console.log(this.userFriendList);
      for(var i=0;i<this.userFriendList.length;i++){
        for(var j=0;j<this.shout.length;j++)
        {
           if(this.userFriendList[i]==this.shout[j].userId)
           {
             //console.log(this.shout[j].userId);
             
             //console.log(this.allShouts);
             for( var k=0;k<this.allUsers.length;k++)
             {
               if(this.shout[j].userId==this.allUsers[k].id)
               {
                   this.shout[j].userProfile=this.allUsers[k].userProfile;
                  
               }
             }
             this.allShouts.push(this.shout[j]);
             //val = arr.sort(this.allShouts[j].created_at);
            this.allShouts.sort((a,b) => 0 - (a.created_at > b.created_at ? 1 : -1));
          //  this.allShouts.sort((a, b) => a.created_at.localeCompare(b.created_at))
             console.log(this.allShouts);

           }
           
        }
    }
  
  
    },
    error=>{
      console.log(error);
    });
    
=======
    
    this.id=sessionStorage.getItem("userId");
  console.log(this.shouts);
    this.userService.getUserById(this.id).subscribe(data => {
      console.log("got"+JSON.stringify(data));
      this.user = data;
      this.frdlist=this.user.friends;
      this.userFriendList = this.frdlist.split(",");
      this.userFriendList.push(this.user.id);
     
    },
    error=>{
      console.log(error);
    });
   

    this.shoutService.getAllShouts().subscribe(data => {
      
      console.log("got"+JSON.stringify(data));
      this.shout = data;
      //console.log(this.userFriendList);
      for(var i=0;i<this.userFriendList.length;i++){
        for(var j=0;j<this.shout.length;j++)
        {
           if(this.userFriendList[i]==this.shout[j].userId)
           {
             //console.log(this.shout[j].userId);
             
             //console.log(this.allShouts);
             for( var k=0;k<this.allUsers.length;k++)
             {
               if(this.shout[j].userId==this.allUsers[k].id)
               {
                   this.shout[j].userProfile=this.allUsers[k].userProfile;
                  
               }
             }
             this.allShouts.push(this.shout[j]);
             //val = arr.sort(this.allShouts[j].created_at);
            this.allShouts.sort((a,b) => 0 - (a.created_at > b.created_at ? 1 : -1));
          //  this.allShouts.sort((a, b) => a.created_at.localeCompare(b.created_at))
             console.log(this.allShouts);

           }
           
        }
    }
  
    debugger;


    },
    error=>{
      console.log(error);
    });
    
>>>>>>> 3f7a13b134f0d913e6422037ab4b2e39e482a354
   
  }

like(shout:any)
{
<<<<<<< HEAD
  const myElement: HTMLElement | null = document.getElementById(shout.id);
  if(myElement!=null){
    var results = this.allShouts.findIndex(x => x.id ===shout.id);
    shout.likes++;
    this.allShouts[results].likes=shout.likes;
  myElement.innerHTML=(shout.likes).toString();
  //.log(id);
console.log(shout.likes);
}
 
var temp={
  'id':shout.id,
  'likes':shout.likes
}

this.shoutService.likeShout(temp).subscribe(data => {
  //this.likes=data.like

});
=======
  //.log(id);
console.log(this.allShouts);
for(var i=0;i<this.allShouts.length;i++)
{
  if(this.allShouts[i].id==shout.id)
  {
    console.log(this.allShouts[i].likes);
    this.likes=this.allShouts[i].likes+1;
  
  console.log(this.likes);
  var temp={
    'id':id,
    'likes':this.likes
  }
  this.shoutService.likeShout(temp).subscribe(data => {
    this.likes=data.likes;
    
  });
  }
}
 

  
}
stop()
{
>>>>>>> 3f7a13b134f0d913e6422037ab4b2e39e482a354
  
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
}


