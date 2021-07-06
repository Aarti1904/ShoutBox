import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { ApprovalsServiceService } from 'src/app/services/approvals-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
 
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
 
  constructor(private approvalService:ApprovalsServiceService, private route:Router, private toaster:ToastrService, private userService: UserServiceService) {
    this.userId="";
    this.password="";
    this.user=new User();
    this.getUser=new User();
   }
 
  ngOnInit(): void {
  }
 
  validateUser(){
   
    this.approvalService.getUser(this.userId).subscribe(
      data => {
       
      
        console.log(data);
        this.getUser=data;
        
        if(this.getUser.id==this.userId && this.getUser.userPass==this.password)
        {       
          if(this.getUser.role=="user"){
            sessionStorage.setItem("userId",this.userId);}
          this.password=this.userId="";
          //debugger;
          if(this.getUser.role=="user"){
         
          window.location.href="http://localhost:4200/shout";
          }
          else
          window.location.href="http://localhost:8000";
         
         Swal.fire({
          title: 'Hurray!!',
          text:   'Login Successfull !!!',
          icon: 'success',
          timer:2500
        }).then(function() {
        
      });
              
       }
        else{
          Swal.fire({
            title: 'Failed!!',
            text:   'Retry with valid password!',
            icon: 'error',
            timer:5000
          });
          //this.toaster.error('Login Failed !!!');
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
    this.approvalService.getUser(this.userId).subscribe(
      data => {
       
      //  debugger;
        console.log(data);
       
        this.getUser=data;
        if(this.getUser.id){
        this.imageUrl=this.getUser.userProfile;
        }
        else{
          Swal.fire({
            title: 'Your request is not yet approved!',
            text:   'Please check mail for approval confirmation!',
            icon: 'error',
            timer:4000
          }).then(function() {
            window.location.reload();
        });
        }
      },
      error=>{
       
      });
  }
 
  forgetPass(){
    
    this.userService.forgetPass(this.getUser.id).subscribe(
      data=>{
        this.toaster.success("Please check your registered mail for password!");
      },
      error=>{
        console.log(error);
        this.toaster.error("Mail sending failed!");
      }
    )
  }
}