import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Shout } from 'src/app/models/shout';
import { User } from 'src/app/models/user';
import { FriendService } from 'src/app/services/friend.service';
import { ShoutService } from 'src/app/services/shout.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-friends-profile',
  templateUrl: './friends-profile.component.html',
  styleUrls: ['./friends-profile.component.scss']
})
export class FriendsProfileComponent implements OnInit {
  id: any;
  user:User;
  imageUrl:any;
  shouts:any;
  text!:boolean;
  images!:boolean;
  videos!:boolean;
  textShouts:Shout[]=[];
  ImageShouts:Shout[]=[];
  VideoShouts:Shout[]=[];
  type!:string;

  constructor(private userService:UserServiceService,private shoutService:ShoutService,private router:Router,private toaster:ToastrService, private friendService:FriendService,private route: ActivatedRoute) 
  { 
    this.user = new User();
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data => {
      
      this.user = data;      
      this.imageUrl = this.user.userProfile;
    });
    this.shoutService.getshoutsbyId(this.id).subscribe(data => {
      this.shouts=data;

      for(var i=0;i<this.shouts.length;i++)
      {
        debugger;
        this.type=this.shouts[i].type;
        console.log(this.type);
        if(this.type=="text")
        {
          this.textShouts.push(this.shouts[i]); 
          console.log(this.ImageShouts);       
        }
        if(this.type=="image")
        {
          console.log("********");
          this.ImageShouts.push(this.shouts[i]);
          console.log(this.ImageShouts);        
        }
        if(this.type=="video")
        {
          this.VideoShouts.push(this.shouts[i]); 
          console.log(this.VideoShouts);       
        }
      }
      
    })

  }
  getposts(string:any){
    
    if(string=="text"){
      console.log(string);
      this.text=true;
      this.images=false;
      this.videos=false;

    }
    if(string=="photos"){
      this.text=false;
      this.images=true;
      this.videos=false;
    }
    if(string=="videos"){
      this.text=false;
      this.images=false;
      this.videos=true;
    }
    
    
  }
}