import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Friend } from 'src/app/models/friend';
import { User } from 'src/app/models/user';
import { CommentsService } from 'src/app/services/comments.service';
import { FriendService } from 'src/app/services/friend.service';
import { ShoutService } from 'src/app/services/shout.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
user:User;
id:any;
newFriend:Friend;
friends:User[];
friendArr:any;
senders:any;
userFriend:User;
friendRequests:Friend[];
imageUrl:any;
allUsers:any;
userFriendList:string[]=[];
userdata:User=new User();
friendimageUrl:any;
userShouts:any;
public searchInput: string = '';
allComments:any=[]; 


  constructor(private userService:UserServiceService, private router:Router, private commentService:CommentsService,
    private toaster:ToastrService, private friendService:FriendService,private shoutService:ShoutService) {

    this.user=this.userFriend=new User();
    this.friends=[];
    this.newFriend=new Friend();
    this.friendRequests=[];
   }

  ngOnInit(): void {
    
    this.id=sessionStorage.getItem("userId");
    this.userService.getUserById(this.id).subscribe(data => {
      
      this.user = data;      
      this.imageUrl = this.user.userProfile;
    });

    this.getAllShouts();

    this.userService.getAllUsers().subscribe(data => {      
      this.allUsers = data;   
      for(var i=0;i<this.allUsers.length;i++)
      {
          if(this.allUsers[i].id==this.id)
          {            
              this.allUsers[i].userName="";             
          }
    
      } 
      console.log(this.allUsers);
     for(var i=0;i<this.allUsers.length;i++)
      {
        if(this.allUsers[i].id==this.id)
        {   
           //console.log(this.allUsers[i].friends)
           this.userFriendList = this.allUsers[i].friends.split(",");

           for(var k=0;k<this.userFriendList.length;k++)
           {
              for(var j=0;j<this.allUsers.length;j++)
               {
                  if(this.allUsers[j].id==this.userFriendList[k])
                  {
                    this.allUsers[j].userName="";
                  }
               }
           }
        }
      }
   
    });
  this.getAllFriends();
  this.getAllComments();
  }

  getAllShouts(){
    this.shoutService.userShouts(this.id).subscribe(data=>{
      console.log(data);
      this.userShouts=data;
    })
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


  getAllFriends(){
  
    this.friends=[];
    this.friendService.getAllRequests(this.id).subscribe(
      data=>{
        console.log("FRiends: "+data)
        this.senders=data;
        var j:number=0;
        //debugger;
       
        for(var i=0;i<this.allUsers.length;i++)
        {
        // debugger;
          if(this.allUsers[i].id==this.senders[j].sender){
          
            this.friends.push(this.allUsers[i]);
            j++;
          }
        }
        console.log(this.senders);
        console.log(this.friends);
      },
      error=>{
        console.log(error);
      }
    )
 
}
  addFriend($id:any){
    this.newFriend.sender=this.user.id;
    this.newFriend.receiver=$id;
    this.friendService.addFriend(this.newFriend).subscribe(
      data=>{
        this.toaster.success('friend request send');
        this.searchInput="";
      },
      error=>{
        this.toaster.error('freind request sent already');
        this.searchInput="";
      }
    )
  }


 acceptFriend(id:any){
  // debugger
 // console.log(id);
    this.friendArr=[];
   
    if(this.user.friends!="")
    {
      this.friendArr=this.user.friends.split(",");
    }
    this.friendArr.push(id);
    this.user.friends=this.friendArr.toString();

    this.userService.updateFriend(this.user,this.user.id).subscribe(
      data => {     
     
        //console.log(id);
       this.toaster.success('Profile Update','success!');
        this.router.navigate(['/timeline']);
      },
      error => {
        console.log("exception occured"+error)
       this.toaster.error('Please Try Again');
      }
    );



      //Change friends list of accepted newFriend
  
      this.userService.getUserById(id).subscribe(
        data=>{
         //console.log(id);
          this.userFriend=data;
          this.friendArr=[];
         // console.log(this.userFriend)
          if(this.userFriend.friends!="")
          this.friendArr=this.userFriend.friends.split(",");
  
          this.friendArr.push(this.user.id);
  
            this.userFriend.friends=this.friendArr.toString();

            this.userService.updateFriend(this.userFriend,id).subscribe(
              data => {              
               // console.log(data);
                this.friendService.deleteRequest(this.userFriend.id,this.user.id).subscribe(
                  data=>{
                   
                   // console.log("Request deleted from table"+data);
                   this.friendService.deleteRequest(this.user.id,this.userFriend.id).subscribe(
                    data=>{
                      this.getAllFriends();
                     // console.log("Request deleted from table"+data);
                    },
                    error=>{
                      this.getAllFriends();
                      console.log(error);
                    }
                  )
                  },
                  error=>{
                    console.log(error);
                  }
                )
                
                //debugger
              },
              error => {
                console.log("exception occured")
               }
            );          
         
        },
        error=>{
          console.log("friendArr finidng failed");
        }
      ); 
  }

  getDeatils(id:any){

    this.userService.getUserById(id).subscribe(data => {
       
       this.userdata = data;      
       this.friendimageUrl = this.userdata.userProfile;
     });
 
   }


   deleteShout(id:any){
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this Shout? ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      
    }).then((result) => {
      if (result.isConfirmed) {
      
        this.shoutService.deleteShout(id).subscribe(
          data => {
            Swal.fire({
              title: 'Deleted!!',
              text:   'Your Shout is deleted!!!',
              icon: 'success',
              timer:2500
            }) 
            
              this.getAllShouts();
          },
          error => {
            console.log(error)
           this.toaster.error('Please Try Again');
          }
        );
  
  
  
        
      }
    })
   }
}
  
 
 