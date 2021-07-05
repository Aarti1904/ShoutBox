import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/models/user';
import { FriendService } from 'src/app/services/friend.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";  

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
userFriend:User;
public searchInput: string = '';

  constructor(private SpinnerService: NgxSpinnerService,private userService:UserServiceService, private router:Router,private toaster:ToastrService, private friendService:FriendService)
   { 
    this.userFriend=new User();
     this.user = new User();
   }

  ngOnInit(): void {
    this.id=sessionStorage.getItem("userId");
    this.SpinnerService.show();  
    this.userService.getUserById(this.id).subscribe(data => {
      
      this.user = data;      
      this.imageUrl = this.user.userProfile;
    });
    this.getAllFriends();
    this.SpinnerService.hide();  

}
////////////////////***********get all friend*********///////////////////
getAllFriends(){
  this.SpinnerService.show();  
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
this.getAllRequest();


});
this.SpinnerService.hide();  
}




////////////////////////get All Request//////////////////////////  
getAllRequest(){
this.friendService.getAllRequests(this.id).subscribe(
  data=>{
    this.senders=data;
    var j:number=0;
    this.friends=[];
  debugger;
  console.log(this.allUsers.length);
    for(var i=0;i<this.allUsers.length;i++)
    {
    console.log(this.allUsers);
    console.log(this.friends);
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
     // debugger;
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
    //  debugger;
      this.frdList.splice(index,1);
     // console.log(this.frdList);
      this.friendArr=[];
      for(var i=0;i<this.frdList.length;i++)
      {
        this.friendArr.push(this.frdList[i].id);
        
      }
      //this.friendArr
     // console.log(this.friendArr.toString());
     
      this.user.friends=this.friendArr.toString();
      //console.log(this.user.friends);
      
    
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

 //Change friends list of accepted newFriend

      this.userService.getUserById(friendId).subscribe(
        data=>{
         //console.log(id);
          this.userFriend=data;
          this.friendArr=[];
         console.log(this.userFriend)
         debugger;
          if(this.userFriend.friends!=""){
             this.friendArr=this.userFriend.friends.split(",");
          }
        if(this.userFriend.friends!=""){
             let position=0;
             for(var k=0;k<this.friendArr.length;k++)
             {
              if(this.friendArr[k]==this.id)
               {
                 console.log(k);
                 position=k;               // exit;
               }
             }
             debugger;
             this.friendArr.splice(position,1);
             console.log(this.friendArr);
             this.frdList=[];
             for(var i=0;i<this.friendArr.length;i++)
             {
               this.frdList.push(this.friendArr[i]);
               
             }
             //this.friendArr
            // console.log(this.friendArr.toString());
            
             this.userFriend.friends=this.frdList.toString();
             console.log(this.userFriend.friends);
            }
              this.userService.updateFriend(this.userFriend,friendId).subscribe(
              data => {              
               
              }
            ,
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

