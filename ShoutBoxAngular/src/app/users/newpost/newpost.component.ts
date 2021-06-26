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
  captionString:any;
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
      console.log(event.target.files[0]);
      this.fileType=event.target.files[0].type;
      reader.readAsDataURL(event.target.files[0]);
    }
}
/* Upload button functioanlity */
onSubmitform(f: NgForm) {
  console.log(f);
  if(this.fileType){
  var myarr=this.fileType.split("/");
  console.log(myarr[0]);
   console.log("Submitting image");
  var myFormData = new FormData();
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  myFormData.append(myarr[0], this.filedata);
  myFormData.append('caption', this.captionString);

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
    console.log(error);
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
else{
  Swal.fire({
    title: 'Sorry',
    text:   "Image uploading failed! Please try again!",
    icon: 'error',
   
  });
}

}

    createFile(f1: NgForm){
   
    console.log(f1.value.text);
    // Convert the text to BLOB.
   
    const newFile=new File([f1.value.text],'firstFile.txt',{ type: 'text/plain' });
    let sFileName = 'abc/username'+'.txt'; // The file to save the data.
    
    let newLink = document.createElement("a");
    newLink.download = sFileName;

    var myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('text', newFile);
    myFormData.append('caption', this.captionString);

    console.log(myFormData)
    this.http.post(`http://localhost:8000/newpost/${this.id}`, myFormData, {
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
        console.log(error);
        Swal.fire({
          title: 'Sorry',
          text:   "Image uploading failed! Please try again!",
          icon: 'error',
          timer:2500
        }).then(function() {
        //  window.location.reload();
      });
      });  
  

    // if (window.webkitURL != null) {
    // newLink.href = window.webkitURL.createObjectURL(textToBLOB);
   
    // }
    // else {
    // newLink.href = window.URL.createObjectURL(textToBLOB);
    // newLink.style.display = "none";
    // document.body.appendChild(newLink);
    // }
    // newLink.click();
  }
}

