import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../models/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
baseUrl:string="http://localhost:8000";
  constructor(private httpClient:HttpClient) { }

  getAllComments():Observable<Comments>{
    return this.httpClient.get<Comments>(`${this.baseUrl}/allcomments`)
  }
  
  addComment(temp:any,id:any):Observable<Comments>{
    return this.httpClient.post<Comments>(`${this.baseUrl}/addComment/${id}`,temp)
  };

  likeComment(temp:any):Observable<Comments>{
    return this.httpClient.post<Comments>(`${this.baseUrl}/likeComment`,temp)
  };
}
