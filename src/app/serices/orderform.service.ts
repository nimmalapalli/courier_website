import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderformService {

  constructor(private orderfrm:HttpClient) { }
  getData():Observable<any>{
    const url='http://localhost:8080/route/read';
    return this.orderfrm.get(url);
  }
}
