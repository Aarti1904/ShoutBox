import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Approval } from 'src/app/models/approval';
import { ApprovalsServiceService } from 'src/app/services/approvals-service.service';
import { Form, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  newUser:Approval;
  userName:string="";

  public isButtonVisible = false;
  public isButton=true;

  // constructor(private authsvc:AuthService) { }
  constructor(private approvalService:ApprovalsServiceService, private router:Router){
  this.newUser=new Approval();

  }
  ngOnInit(): void {
    var id= sessionStorage.getItem("userId");
    
    if(id && id!="")
    {
      this.isButton=false;
      this.isButtonVisible=true;
    }
  }

  
  addUser(user:NgForm){

  console.log(this.newUser);
  this.approvalService.createUserForApproval(this.newUser)
  .subscribe(data => {
    this.newUser=new Approval();
    console.log(data);
    Swal.fire({
      title: 'Registration Successfull!',
      text:   " Please check your mail for password!",
      icon: 'success',
      timer:2500
    }).then(function() {
      window.location.reload();
  });
}, error => console.log(error));
  
 
  }

  logout()
  {
     //this.authsvc.logout();
     this.isButton=true;
        this.isButtonVisible=false;
        sessionStorage.removeItem("userId");
        this.router.navigate(['home']);
  }
}