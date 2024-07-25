import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public loader:LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     this.loader.isLoading.next(true);

    //  return next.handle(req).pipe(
    //   finalize(
    //     ()=>{
    //       this.loader.isLoading.next(false);
    //     }
    //   )
    //  )
    return next.handle(req).pipe(
      finalize(
        ()=>{
          this.loader.isLoading.next(false)
        }
      )
    )
  }
}
