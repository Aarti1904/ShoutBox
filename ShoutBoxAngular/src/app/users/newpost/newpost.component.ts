import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewpostComponent implements OnInit {
  imgSrc:any;
  selectedFile!: File;
  dataUrl:any;
  userProfile:any;
  imageUrl: any;
  user:any;
  id:any;
  fileType:any;
  filedata:any;

  constructor(
    private profileService : UserServiceService,
    private router: Router,
    private http:HttpClient,
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

   
  onFileChanged(event:any){
    this.filedata = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      var reader = new FileReader();
      
      reader.onload = (event: any) => {
        this.imgSrc = event.target.result;
     
      }
      console.log(event.target.files[0].type);
      this.fileType=event.target.files[0].type;
      reader.readAsDataURL(event.target.files[0]);
    }
}
/* Upload button functioanlity */
onSubmitform(f: NgForm) {
  if(this.fileType){
  var myarr=this.fileType.split("/");
  console.log(myarr[0]);
   console.log("Submitting image");
  var myFormData = new FormData();
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  myFormData.append(myarr[0], this.filedata);
  console.log("Myform----------"+myFormData);
  /* Image Post Request */

  this.http.post(`http://localhost:8000/newpost/${this.id}`, myFormData, {
  headers: headers
  }).subscribe(
    (      data: { [x: string]: any; }) => {
      console.log(data);
   //Check success message
   //sweetalert message popup
   
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
    console.log("Path:"+error['path']);
    Swal.fire({
      title: 'Sorry',
      text:   "Image uploading failed! Please try again!",
      icon: 'error',
      timer:2500
    }).then(function() {
     
  });
  });  
}
else{
  Swal.fire({
    title: 'Sorry',
    text:   "Image uploading failed! Please try again!",
    icon: 'error',
   
  });
}

}

}

