import { CUSTOM_ELEMENTS_SCHEMA, Component, asNativeElements } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../serices/auth.service';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, 
  RouterOutlet, RouterModule,MatMenuModule,MatSidenavModule,MatStepperModule,ReactiveFormsModule,FormsModule,MatFormFieldModule,MatButtonModule,MatInputModule,MatCardModule,MatIconModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  galleryForm!: FormGroup;
  imageFile!: File;
  imageTitle = '';
  imageDesc = '';
  checked = false;
  hide = true;
  signupform!:FormGroup;
  shortLink: string = ""; 
 // Flag variable 
  file!: File ;
  constructor( private cv:FormBuilder,private auth:AuthService,private snackBar:MatSnackBar ){
   this.signupform =this.cv.group({
    name:["",Validators.required],
    email:["",Validators.required],
    mobile:["",Validators.compose([Validators.required,Validators.pattern(new RegExp("([0-9 ]{11})|([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})"))])],
    password:["",Validators.compose([Validators.required,  Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    )])],
    companyname:["",Validators.required],
   })
 

  }
  signup(){
  const data = this.signupform.value;
  console.log(this.signupform.value)
  delete data['confirm'];
  this.auth.signup(data).subscribe((res:any)=>{
    this.snackBar.open(JSON.stringify(res.message));
  })
      
      
    }

    onChange(event:any) { 
      this.file = event.target.files[0]; 
  } 

  // OnClick of button Upload 


  }

