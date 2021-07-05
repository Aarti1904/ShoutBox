import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Approval } from '../models/approval';


@Injectable({
  providedIn: 'root'
})
export class ApprovalsServiceService {
  
  private baseUrl:string;

  constructor(private http:HttpClient) {
    this.baseUrl = 'http://localhost:8000';
   }

   getUser(id:string):Observable<User>
  {
    return this.http.get<User>(this.baseUrl+'/users/'+id);
  }

  createUserForApproval(user:Approval):Observable<Object>
  {
    var str=JSON.stringify(user);
    console.log(str);
    var obj=JSON.parse(str);
    console.log(obj);
    return this.http.post(this.baseUrl+'/approvals/store',obj);
  }
}
