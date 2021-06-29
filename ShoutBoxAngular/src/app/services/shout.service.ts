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
<<<<<<< HEAD

  likeShout(temp:any):Observable<Shout>{
    return this.httpClient.post<Shout>(`${this.baseUrl}/likeShout`,temp)
  };

  dislikeShout(temp:any):Observable<Shout>{
    return this.httpClient.post<Shout>(`${this.baseUrl}/dislikeShout`,temp)
  };
=======
  likeShout(temp:any):Observable<Shout>{
    return this.httpClient.post<Shout>(`${this.baseUrl}/likeShout`,temp)
  };
>>>>>>> 3f7a13b134f0d913e6422037ab4b2e39e482a354
}
