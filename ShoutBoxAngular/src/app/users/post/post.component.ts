import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  selectedFile!: File;
user:any;
id:any;
    constructor(private userService:UserServiceService, private http:HttpClient) { }

  ngOnInit(): void {
    
    this.id=sessionStorage.getItem("userId");

    this.userService.getUserById(this.id).subscribe(data => {
      console.log("got"+JSON.stringify(data));

      this.user = data;
    })
  }

  filedata:any;
  /* File onchange event */
  fileEvent(e:any){
      this.filedata = e.target.files[0];
  }
  /* Upload button functioanlity */
  onSubmitform(f: NgForm) {
     
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
     //Check success message
     //sweetalert message popup
      // Swal.fire({
      //      title: 'Hurray!!',
      //      text:   data['message'],
      //      icon: 'success'
      //  });
       
    });  

}

}
