import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../serices/auth.service';

import { LoaderService } from '../serices/loader/loader.service';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { RegisterComponent } from '../register/register.component';
import { StorageService } from '../storage.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ErrorStateMatcher , ShowOnDirtyErrorStateMatcher  } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
 
    return !!(control && control.invalid && (control.dirty || control.touched ));
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, 
  RouterOutlet, RouterModule,ForgetpasswordComponent,ReactiveFormsModule,MatFormFieldModule,MatButtonModule,MatInputModule,MatCardModule,MatIconModule,RegisterComponent,MatProgressSpinnerModule,MatInputModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  data:any;
  hide = true;
  loading$ = this.loader.loading$;
 loginForm!:FormGroup;
 isLoggedIn = false;
 showAdminBoard = false;
 showModeratorBoard = false;
 private roles: string[] = [];

 
 constructor(private fb:FormBuilder,private auth:AuthService,private router:Router,public dialog: MatDialog,public loader:LoaderService,public route:ActivatedRoute,private snackBar:MatSnackBar,private storageService: StorageService){
  this.data={_id:this.route.snapshot.params['_id']}
  this.loginForm = this.fb.group({
    "email":["", Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    "password":["",Validators.required]
  })
 }
 ngOnInit() {

 
}
  login(){
    const data = this.loginForm.value;
  
    this.loader.show()
    this.auth.signin(data).subscribe((res:any)=>{
      if(res.success){
        localStorage.setItem('token', res.token);
        this.loader.hide()
        this.snackBar.open(JSON.stringify(res.message));
      // alert(res.message);
      this.getProfile();

    }else{
      // alert(res.message);
      this.snackBar.open(JSON.stringify(res.message));
    }
    }),(err:any) =>{
     alert(`login failed`)
    }
  
  }
  getProfile(){
    this.auth.getprofile().subscribe((res:any)=>{
      this.data=res['data'];
       console.log(res)
       this.router.navigateByUrl('/home')
    })
    } 
  openDialog() {
    const dialogRef = this.dialog.open(ForgetpasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  matcher = new MyErrorStateMatcher();
}
