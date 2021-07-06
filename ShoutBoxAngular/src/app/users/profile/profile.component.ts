import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/user-service.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  imgSrc:any;
  selectedFile!: File;
  dataUrl:any;
  userProfile:any;
  imageUrl: any;
  user:any;
  id:any;

   constructor(
     private profileService : UserServiceService,
     private router: Router,
     private toaster: ToastrService,
     private http:HttpClient,
     private sanitization: DomSanitizer
   ) { }
 
   ngOnInit(): void {
 
     this.id=sessionStorage.getItem("userId");

     this.profileService.getUserById(this.id).subscribe(data => {
       console.log("got"+JSON.stringify(data));
 
       this.user = data;
       this.imageUrl = this.user.userProfile;
       console.log(this.imageUrl)
     })
     
   }
   getUser() {
     this.router.navigate(['/profile']);
   }
 
   book(bookingForm: NgForm) {
  
     var id = this.user.id;
     
     this.profileService.updateUser(this.user,id).subscribe(
       data => {
        
      
         console.log(data);
         
         this.toaster.success('Profile Update','success!');
         window.location.reload();
       },
       error => {
         console.log("exception occured")
         //alert("system not able to update profile")
         this.toaster.error('Please Try Again');
       }
     )
   }

 

  onSubmit() {
    //debugger;
    var temp={
      "userProfile":this.imgSrc
    }
    this.profileService.updateProfile(temp,this.id).subscribe(
      data => {
        //debugger;
        console.log("response received")
       
        this.toaster.success("Update", "Done!");
        window.location.reload();
      },
      error => {
        console.log(error);
        this.toaster.error("Please try again!");
      }
    );
  }

  filedata:any;
  /* File onchange event */
  
  onFileChanged(event:any){
      this.filedata = event.target.files[0];

      if (event.target.files && event.target.files[0]) {
        this.selectedFile = event.target.files[0];
        var reader = new FileReader();
        
        reader.onload = (event: any) => {
          this.imgSrc = event.target.result;
        console.log(this.imgSrc);
        }
        reader.readAsDataURL(event.target.files[0]);
      }
  }
  /* Upload button functioanlity */
  onSubmitform(f: NgForm) {
     console.log("Submitting image");
    var myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('image', this.filedata);
    console.log("Myform----------"+myFormData);
    
    /* Image Post Request */
  
    this.http.post(`http://localhost:8000/saveImage/${this.id}`, myFormData, {
    headers: headers
    }).subscribe(
      (      data: { [x: string]: any; }) => {
        console.log(data);
    
      Swal.fire({
        title: 'Hurray!!',
        text:   data['message'],
        icon: 'success',
        timer:2500
      }).then(function() {
        window.location.reload();
    });
    
    },
    error=>{
      Swal.fire({
        title: 'Sorry',
        text:   "Image uploading failed! Please try again!",
        icon: 'error',
        timer:2500
      }).then(function() {
        window.location.reload();
    });
    });  

}

public getSantizeUrl(url : string) {
  return this.sanitization.bypassSecurityTrustUrl(url);
}


  }
