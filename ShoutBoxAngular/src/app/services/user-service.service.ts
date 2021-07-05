import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  private baseUrl = 'http://localhost:8000';
  
  constructor(private httpClient: HttpClient) { }

getUserById(id: string):Observable<User>{
    return this.httpClient.get<User>(`${this.baseUrl}/users/${id}`)
  };

  getAllUsers():Observable<User>{
    return this.httpClient.get<User>(`${this.baseUrl}/allusers`)
  };

  updateUser(updatedobj:User, id:any):Observable<Object>{
    var str=JSON.stringify(updatedobj);
    console.log(str);
    var obj=JSON.parse(str);
    return this.httpClient.put<Object>(`${this.baseUrl}/users/update/${id}`,obj)
   }

   updateFriend(updatedobj:User, id:any):Observable<Object>{
    var str=JSON.stringify(updatedobj);
    console.log(str);
    var obj=JSON.parse(str);
    return this.httpClient.put<Object>(`${this.baseUrl}/users/addFriend/${id}`,obj)
   }
  
   updateProfile(obj:any,id:any):Observable<Object>{
    return this.httpClient.put<Object>(`${this.baseUrl}/users/updateProfile/${id}`,obj)
   }

   updateDbImage(myFormData:FormData,id:any):Observable<Object>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    console.log(myFormData);
    return this.httpClient.post<Object>(`${this.baseUrl}/saveImage/${id}`, myFormData, {
      headers: headers
      });
     
   }

   forgetPass(id: string):Observable<User>{
     
    return this.httpClient.get<User>(`${this.baseUrl}/forgetPass/${id}`)
  };
}
