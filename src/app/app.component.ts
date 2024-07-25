import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavComponent } from './nav/nav.component';
import { LoaderService } from './serices/loader/loader.service';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { AuthService } from './serices/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
    NgxSpinnerModule,RouterOutlet, RouterModule,NavComponent,MatProgressSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'regtech';
  loading$ = this.loader.loading$;
  constructor(public loader:LoaderService,private auth:AuthService,private _snackBar: MatSnackBar) {
    this.loader.hide()
    
  }






name:string='narendra'
onlineEvent!: Observable<Event>;
offlineEvent!: Observable<Event>;

subscriptions: Subscription[] = [];

connectionStatusMessage!: string;
connectionStatus!: string;



ngOnInit(){
  /**
  * Get the online/offline status from browser window
  */


  this.onlineEvent = fromEvent(window, 'online');
  this.offlineEvent = fromEvent(window, 'offline');

  this.subscriptions.push(this.onlineEvent.subscribe((e:any) => {
    this.connectionStatusMessage = 'Back to online';
    this.connectionStatus = 'online';
    console.log('Online...');
    this._snackBar.open(JSON.stringify(this.connectionStatusMessage));
  }));

  this.subscriptions.push(this.offlineEvent.subscribe(e => {
    this.connectionStatusMessage = 'Connection lost! You are not connected to internet';
    this.connectionStatus = 'offline';
    console.log('Offline...');
    this._snackBar.open(JSON.stringify(this.connectionStatusMessage));
  }));

  
}


ngOnDestroy() {
  /**
  * Unsubscribe all subscriptions to avoid memory leak
  */
  this.subscriptions.forEach(subscription => subscription.unsubscribe());
}
}
