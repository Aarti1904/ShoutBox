import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Friend } from 'src/app/models/friend';
import { User } from 'src/app/models/user';
import { FriendService } from 'src/app/services/friend.service';
import { UserServiceService } from 'src/app/services/user-service.service';

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
public searchInput: string = '';
  constructor(private userService:UserServiceService, private router:Router,private toaster:ToastrService, private friendService:FriendService) {

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

    this.userService.getAllUsers().subscribe(data => {      
      this.allUsers = data;   
      for(var i=0;i<this.allUsers.length;i++)
      {
          if(this.allUsers[i].id==this.id)
          {
             
              this.allUsers[i].userName="";
              
           }
      
      } 
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

    this.friendService.getAllRequests(this.id).subscribe(
      data=>{
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
        //console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }


 acceptFriend(id:any){
  console.log(id);
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
                  },
                  error=>{
                    console.log(error);
                  }
                )
                 this.router.navigate(['/timeline']);
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

}
  
 
 