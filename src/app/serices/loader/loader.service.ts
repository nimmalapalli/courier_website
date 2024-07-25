import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading:BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  show() {
    this._loading.next(true);
  }

  hide() {
    this._loading.next(false);
  }
  constructor() { }
  // public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  // private _loading = new BehaviorSubject<boolean>(false)
  // public readonly loading$ = this._loading.asObservable
  // show(){
  //   this._loading.next(true)
  // }
  // hide(){
  //   this._loading.next(false)
  // }
}
