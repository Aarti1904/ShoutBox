import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Friend } from '../models/friend';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  
  private baseUrl:string;

  constructor(private http:HttpClient) { 
    this.baseUrl = 'http://localhost:8000';
  }

 addFriend(frd:Friend):Observable<Object>
  {
    var str=JSON.stringify(frd);
    console.log(str);
    var obj=JSON.parse(str);
    console.log(obj);
    return this.http.post(this.baseUrl+'/addFriend',obj);
  }

  getAllRequests(id:any):Observable<Friend>
  {
    console.log(this.baseUrl+'/getFrdRequests/'+id);
    return this.http.get<Friend>(this.baseUrl+'/getFrdRequests/'+id);;
  }

  deleteRequest(sender:any,receiver:any):Observable<Object>
  {
    return this.http.delete<Object>(this.baseUrl+'/friendDelete/'+sender+'/'+receiver);
  }
}
