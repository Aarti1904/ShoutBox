import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../models/report';
import { Shout } from '../models/shout';

@Injectable({
  providedIn: 'root'
})
export class ShoutService {

  
  private baseUrl = 'http://localhost:8000';
  constructor(private httpClient: HttpClient) { }
  
  getAllShouts():Observable<Shout>{
    return this.httpClient.get<Shout>(`${this.baseUrl}/allshouts`)
  }

  userShouts(id:any):Observable<Shout>{
    return this.httpClient.get<Shout>(`${this.baseUrl}/userShouts/${id}`)
  }

  likeShout(temp:any):Observable<Shout>{
    return this.httpClient.post<Shout>(`${this.baseUrl}/likeShout`,temp)
  }

  dislikeShout(temp:any):Observable<Shout>{
    return this.httpClient.post<Shout>(`${this.baseUrl}/dislikeShout`,temp)
  }

  deleteShout(id:any):Observable<Shout>{
    return this.httpClient.get<Shout>(`${this.baseUrl}/deleteShout/${id}`)
  }

  getShoutsById(id:any):Observable<Shout>{
    return this.httpClient.get<Shout>(`${this.baseUrl}/friendsshouts/${id}`)
  }
 
  addreport(temp:any):Observable<Report>{
    return this.httpClient.post<Report>(`${this.baseUrl}/addreport`,temp)
  };
}
