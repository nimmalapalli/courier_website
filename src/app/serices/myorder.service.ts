import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MyorderService {
  baseapi=environment.apiurl;
  constructor(private http:HttpClient) { }
  getData():Observable<any>{
 
    return this.http.get(this.baseapi +`/read/`);
  }

  CreateOrder(data:any):Observable<any>{
    return this.http.post(this.baseapi +`/createorder`,data);
  }
}

