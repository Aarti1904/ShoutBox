import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
 
  constructor( private toaster:ToastrService,public router:Router) { 
    
    
  }
  canActivate(){
    let userId=sessionStorage.getItem("userId")
    if(userId){
      return true;
    }
   this.toaster.error("Please Login to ShoutBox") 
    this.router.navigate(['/home']);
    return false;
  }
}