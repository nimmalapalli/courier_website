
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseapi=environment.apiurl;

  constructor(private http:HttpClient) { }
    signup(data:any):Observable<any>{

      return this.http.post(this.baseapi +`/register`,data)
    }
  
    signin(data:any):Observable<any>{


      return this.http.post(this.baseapi +`/login`,data)
    }
   
    getprofile():Observable<any>{
      const Headers ={
         'Authorization': "Bearer " + localStorage.getItem('token'),
      

      }
      
      return this.http.get<any>(this.baseapi+`/profile/`,{headers:Headers})
    }
    logout(){
     localStorage.clear();
    }
   IsLoggedin():boolean{
  
    return !localStorage.getItem('token');
   }

    getCurrentUser() {
      // Retrieve user information from localStorage
      const userString = localStorage.getItem('currentUser');
      return userString ? JSON.parse(userString) : null;
    }

    getDetails():Observable<any>{
      return this.http.get(`http://localhost:5000/auth/read`)
      }
  upload(file:any):Observable<any> { 
  
      // Create form data 
      const formData = new FormData();  
        
      // Store form name as "file" with file data 
      formData.append("file", file, file.name); 
        
      // Make http post request over api 
      // with formData as req 
      return this.http.post(`http://localhost:5000/auth/read`, formData) 
  } 

  forgotPassword(email: string): Observable<any> {
    // Make an HTTP request to your backend API to initiate the forget password process
    return this.http.post('http://localhost:8080/api/forgotpassword', email );
  
  }
 
  
  resetPassword(data:any): Observable<any> {
    // Make an HTTP request to your backend API to initiate the forget password process
    return this.http.post('http://localhost:8080/api/resetpassword', data );
  
  }
 
geNav(): Observable<any>{
  return this.http.get('http://localhost:8000/api/navigation' );
}
 
payment(data:any): Observable<any>{
  return this.http.post('http://localhost:8000/api/order', data );
}

createWalletPayment(amount: number, currency: string, customerId: string, walletType: string): Observable<any> {
  return this.http.post<any>(`${this.baseapi}/wallet`, {
    amount,
    currency,
    customer_id: customerId,
    wallet_type: walletType
  });
}

verifyPayment(paymentId: string, orderId: string, signature: string): Observable<any> {
  return this.http.post<any>(`${this.baseapi}/callback`, {
    razorpay_payment_id: paymentId,
    razorpay_order_id: orderId,
    razorpay_signature: signature
  });
}
} 

    

