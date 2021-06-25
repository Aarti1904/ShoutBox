import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { ApprovalsServiceService } from 'src/app/services/approvals-service.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
userId:string;
password:string;
user:User;
getUser:User;
imageUrl:any;
  constructor(private userService:ApprovalsServiceService, private route:Router, private toaster:ToastrService) {
    this.userId="";
    this.password="";
    this.user=new User();
    this.getUser=new User();
   }

  ngOnInit(): void {
  }

  validateUser(){
    
    this.userService.getUser(this.userId).subscribe(
      data => {
       
      //  debugger;
        console.log(data);
        this.getUser=data;
        
        if(this.getUser.id==this.userId && this.getUser.userPass==this.password)
        {
      
          
          sessionStorage.setItem("userId",this.userId);
          this.password=this.userId="";
         
         Swal.fire({
          title: 'Hurray!!',
          text:   'Login Successfull !!!',
          icon: 'success',
          timer:2500
        }).then(function() {
          window.location.href="http://localhost:4200/timeline";
      });
              
       }
        else{
          
          this.toaster.error('Login Failed !!!');
          this.password=this.userId="";
        }
      },
      error => {
        console.log(error)
        //alert("system not able to update profile")
        //this.toaster.error('Register first, If already registered wait for Approval!');
        Swal.fire({
          title: 'Failed!',
          text:   "Register first, If already registered wait for Approval!",
          icon: 'warning',
        });
      }
    );

  }
 
  getUserById(){
    this.userService.getUser(this.userId).subscribe(
      data => {
       
      //  debugger;
        console.log(data);
        this.getUser=data;
        this.imageUrl=this.getUser.userProfile;
      });
  }
}
