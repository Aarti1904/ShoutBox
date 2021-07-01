import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/models/user';
import { FriendService } from 'src/app/services/friend.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  id:any;
  user:User;
  imageUrl:any;
  allUsers:any;
  userFriends!:[];
  frdList!:User[];
  friends!:User[];
  friendArr:any;
senders:any;
userdata:User=new User();

  constructor(private userService:UserServiceService, private router:Router,private toaster:ToastrService, private friendService:FriendService)
   { 
   
     this.user = new User();
   }

  ngOnInit(): void {
    this.id=sessionStorage.getItem("userId");
    this.userService.getUserById(this.id).subscribe(data => {
      
      this.user = data;      
      this.imageUrl = this.user.userProfile;
    });
  this.getAllFriends();
  this.getAllRequest();
  
}
////////////////////***********get all friend*********///////////////////
getAllFriends(){
this.userService.getAllUsers().subscribe(data => {      
  this.allUsers = data;   
  this.frdList=[];
  for(var i=0;i<this.allUsers.length;i++)
  {
  //  debugger;

      if(this.allUsers[i].id==this.id)
      {
         //console.log(this.allUsers[i])
          this.allUsers[i].userName="";
          this.userFriends=this.allUsers[i].friends.split(",");
        //  console.log(this.userFriends);
          for(var k=0;k<this.userFriends.length;k++)
          {

               for(var j=0;j<this.allUsers.length;j++)
               {
                 if(this.userFriends[k]==this.allUsers[j].id)
                 {
                    this.frdList.push(this.allUsers[j]);
                   // console.log(this.frdList);
               }
          }
          
       }
  
  }
}
});
}




////////////////////////get All Request//////////////////////////  
getAllRequest(){
this.friendService.getAllRequests(this.id).subscribe(
  data=>{
    this.senders=data;
    var j:number=0;
    this.friends=[];
    //debugger;
    for(var i=0;i<this.allUsers.length;i++)
    {
  //  debugger;
      if(this.allUsers[i].id==this.senders[j].sender){
      
        this.friends.push(this.allUsers[i]);
        j++;
      }
   
    }
    //debugger;
    console.log(this.senders);
    console.log(this.friends);
  },
  error=>{
    console.log(error);
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
       this.toaster.success('Friend added','success!');
        //this.router.navigate(['/timeline']);
      //  this.getAllRequests();
     this.friendService.deleteRequest(id,this.user.id).subscribe(
        data=>{
         // console.log("Request deleted from table"+data);
               this.getAllRequest();
               this.getAllFriends();
           },
           error=>{
          console.log(error);
          }
       )
     

      
      },
      error => {
        console.log("exception occured"+error)
       this.toaster.error('Please Try Again');
      }
    );
  
   }

////////////////////////////*******Unfriend**********/////////////////////////
unfriend(friendId:any)
{
  Swal.fire({
    title: 'Are you sure?',
    text: "You want To unfriend "+friendId,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Unfriend it!'
  }).then((result) => {
    if (result.isConfirmed) {
      var index=0;
      for(var i=0;i<this.frdList.length;i++)
      {
        if(this.frdList[i].id==friendId)
        {
          console.log(i);
          index=i;
        // exit;
        }
      }
      this.frdList.splice(index,1);
      console.log(this.frdList);
      this.friendArr=[];
      for(var i=0;i<this.frdList.length;i++)
      {
        this.friendArr.push(this.frdList[i].id);
        
      }
      //this.friendArr
     // console.log(this.friendArr.toString());
     
      this.user.friends=this.friendArr.toString();
      console.log(this.user.friends);
      
    
      this.userService.updateFriend(this.user,this.user.id).subscribe(
        data => {
         this.toaster.success("Removed from frd list!");
          this.getAllFriends();

        },
        error => {
          console.log(error)
         this.toaster.error('Please Try Again');
        }
      );





      
    }
  })
  
  
  
 
  
}
deleteFriendRequest(friendId:any)
{
  Swal.fire({
    title: 'Are you sure?',
    text: "You want To Decline request "+friendId,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Decline request!'
  }).then((result) => {
    if (result.isConfirmed) {

  this.friendService.deleteRequest(friendId,this.id).subscribe(
    data=>{
     // console.log("Request deleted from table"+data);
     this.getAllRequest();
     this.toaster.success("Request deleted!");
    },
    error=>{
      console.log(error);
    } 
  )
    }
  })
}

getFriendData(id:string)
{
    this.router.navigate(['friendProfile',id]);
}
getDeatils(id:any){

  this.userService.getUserById(id).subscribe(data => {
     
     this.userdata = data;      
    // this.friendimageUrl = this.userdata.userProfile;
   });

 }

}

