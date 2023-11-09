import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }
  isLoggedIn=new BehaviorSubject(false);
  getRequest(url:string){
    return this.http.get(url);
  }
  postRequest(url:string,body:any){
    return this.http.post(url,body);
  }

}
