
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { AuthService } from '../serices/auth.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule, 
  RouterOutlet, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  
  isHandset$: Observable<boolean>;
  forgetPasswordForm!: FormGroup;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authservice: AuthService,
    private formBuilder: FormBuilder,private route:Router
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgetPasswordForm.valid) {
      const email = this.forgetPasswordForm.value.email;
      
      // Here you can handle the form submission, for example, call a service method
      // For example:
      this.authservice.forgotPassword(email).subscribe(response => {
        // Handle success response
        console.log(response)
      }, error => {
        // Handle error response
      });
    } else {
      // If the form is invalid, mark all fields as touched to display validation errors
      this.forgetPasswordForm.markAllAsTouched();
    }
  }
  handleClick() {

  }
}

