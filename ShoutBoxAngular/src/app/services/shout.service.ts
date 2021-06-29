import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shout } from '../models/shout';

@Injectable({
  providedIn: 'root'
})
export class ShoutService {

  
  private baseUrl = 'http://localhost:8000';
  constructor(private httpClient: HttpClient) { }
  getAllShouts():Observable<Shout>{
    return this.httpClient.get<Shout>(`${this.baseUrl}/allshouts`)
  };

  userShouts(id:any):Observable<Shout>{
    return this.httpClient.get<Shout>(`${this.baseUrl}/userShouts/${id}`)
  };
  likeShout(temp:any):Observable<Shout>{
    return this.httpClient.post<Shout>(`${this.baseUrl}/likeShout`,temp)
  };
}
