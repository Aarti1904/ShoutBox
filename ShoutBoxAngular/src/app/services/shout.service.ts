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
}
