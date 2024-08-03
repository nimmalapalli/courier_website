import { CUSTOM_ELEMENTS_SCHEMA, Component, HostBinding, OnInit, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import {  ActivatedRoute, NavigationStart, Route, Router, RouterModule, RouterOutlet } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { OverlayContainer } from '@angular/cdk/overlay';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { NavbarService } from '../serices/navbar.service';
import { Navbar2Service } from '../serices/navbar2.service';
import { AuthService } from '../serices/auth.service';
import { LoaderService } from '../serices/loader/loader.service';
import { RechargedialogComponent } from '../rechargedialog/rechargedialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RegisterComponent } from '../register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { B2cOrdersComponent } from '../b2c-orders/b2c-orders.component';import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MyorderService } from '../serices/myorder.service';
import { MatFormFieldModule } from '@angular/material/form-field';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, 
  RouterOutlet, RouterModule,MatMenuModule,MatSidenavModule,RegisterComponent,MatIconModule,MatButtonModule,MatSidenavModule,MatToolbarModule,B2cOrdersComponent,MatTooltipModule,MatSlideToggleModule,MatFormFieldModule,ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  showHead: boolean=false;
  isOpened:boolean=false;
  isOpen:boolean=false;
  isOpens:boolean=false;
  data:any;
  private breakpointObserver = inject(BreakpointObserver);
  user:any;
  navdata:any;
  paymentid:any;
  totalamount:any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    constructor(public dialog: MatDialog,private _snackBar: MatSnackBar, public nav: NavbarService,public nav1: Navbar2Service,private auth:AuthService,private router:Router,private overlay:OverlayContainer,public loader:LoaderService,private route:ActivatedRoute,private od:MyorderService,private sf:FormBuilder) {
      this.user= this.auth.getCurrentUser()
      console.log(this.auth.getCurrentUser());
      this.data={_id:this.route.snapshot.params['_id']}
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/' || event['url'] == '/register' || event['url'] == '/forgetpassword') {
            this.showHead = false;
          } else {
            // console.log("NU")
            this.showHead = true;
          }
        }
        
      });
     
     
      this.getnav();
    }
   
    onLogout(){
      this.auth.logout();
      this.router.navigateByUrl('/')
    }

    searchText = '';
    characters = [
    
   
    ];

    durationInSeconds = 5;
    openSnackBar() {
      // this._snackBar.openFromComponent(SnackbarComponent, {
      //   duration: this.durationInSeconds * 1000,
      // });
    }
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(RechargedialogComponent, {
        width: '450px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  url = '';
  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  toggleOpenClosed() {
         this.isOpened = !this.isOpened;
  }
  toggleOpenClose1() {
    this.isOpen = !this.isOpen;
}
toggleCloseOpen() {
  this.isOpens = !this.isOpens;
}
isDarkTheme:boolean = true;;
ngOnInit(): void {

  this.toggleControl.valueChanges.subscribe(
    (darkMode:any)=>{
      this.className= darkMode ? this.darkClassName : this.lightClassName;
      if(darkMode){
        this.overlay.getContainerElement().classList.add(this.darkClassName);

      }else{
        this.overlay.getContainerElement().classList.remove(this.darkClassName);
      }

    }
  )
 

  }
  
  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';


    getnav(){
      this.auth.geNav().subscribe((res:any)=>{
        console.log(res)
        this.navdata=res['data']
      })
    }

    payment(){
      this.auth.payment(this.data).subscribe((res:any)=>{
       console.log(res);
       this.paymentid =res
      })
    }


}
