import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { FriendService } from 'src/app/services/friend.service';
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

  constructor(private userService:UserServiceService, private router:Router,private toaster:ToastrService, private friendService:FriendService,private route: ActivatedRoute) 
  { 
    this.user = new User();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data => {
      
      this.user = data;      
      this.imageUrl = this.user.userProfile;
    });

  }
}
