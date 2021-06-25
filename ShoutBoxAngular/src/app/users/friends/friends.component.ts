import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { FriendService } from 'src/app/services/friend.service';
import { UserServiceService } from 'src/app/services/user-service.service';


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
  frdList:User[]=[];
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

    this.userService.getAllUsers().subscribe(data => {      
      this.allUsers = data;   
      debugger;
      for(var i=0;i<this.allUsers.length;i++)
      {
          if(this.allUsers[i].id==this.id)
          {
             
              this.allUsers[i].userName="";
              this.userFriends=this.allUsers[i].friends.split(",");
            //  console.log(this.userFriends);
              for(var i=0;i<this.userFriends.length;i++)
              {
                   for(var j=0;j<this.allUsers.length;j++)
                   {
                     if(this.userFriends[i]==this.allUsers[j].id)
                     {
                        this.frdList.push(this.allUsers[j]);
                        console.log(this.frdList);
                   }
              }
              
           }
      
      }
    }
  });

  }

  getFriendData(id:string)
  {
    this.router.navigate(['friendProfile',id]);
  }
}

