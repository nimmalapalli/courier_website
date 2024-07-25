import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './order';
import { User } from './user';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
private headers = new HttpHeaders().set('Content-Type','application/json')
  constructor(private http:HttpClient) { }
  createorder(user:Users):Observable<any>{
    return this.http.post('http://localhost:3000/ship/create',user)
  }
  readorder():Observable<any>{
    return this.http.get('http://localhost:3000/ship/read',{headers:this.headers})
  }
updateorder(user:Users):Observable<any>{
    return this.http.put('http://localhost:3000/route/update',user)
  }
  deleteorder(id:any):Observable<any>{
    return this.http.delete('http://localhost:3000/route/delete'+id)
  }
}
