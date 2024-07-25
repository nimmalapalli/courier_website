import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private http: HttpClient) {}
  getData(): Observable<any> {
    const url = 'http://localhost:3000/ship/read'; 
    return this.http.get(url);
  }
}