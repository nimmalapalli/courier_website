import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../serices/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from '../register/register.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MyserviceService } from '../serices/myservice.service';
import { MyorderService } from '../serices/myorder.service';

@Component({
  selector: 'app-forward-create',
  standalone: true,
  imports: [CommonModule, 
  RouterOutlet, RouterModule,ReactiveFormsModule,MatFormFieldModule,MatButtonModule,MatInputModule,MatCardModule,MatIconModule,MatMenuModule,MatGridListModule,MatIconModule,MatFormFieldModule,MatSelectModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './forward-create.component.html',
  styleUrls: ['./forward-create.component.css']
})
export class ForwardCreateComponent {
  orderId:any;
  orderForm!:FormGroup;
  pincodeData:any;
 title='narendra'
data:any;
code!:number;
postproduct:any;
city:any;
state:any;
user_id:any;
profileData:any;
  constructor(private of:FormBuilder,private auth:AuthService,private http:HttpClient,private os:MyorderService){

    this.orderForm=this.of.group({
      user_id:"",
      order:"" ,
      orderType: "",
      fname: "",
      lname: "",
      companyName:"",
      Address:"",
      pincode:"",
      city:"",
      state:"",
      payment:"",
      product:"",
      phone:"",
      weight:"",
      length:"",
      width:"",
      height:''
    })


    this.orderForm.controls['order'].setValue(Math.floor(100000 + Math.random() * 900000))

    
    console.log(this.orderId);
    this.profile()

  }
SubmitOrderForm(){ 
  const data =this.orderForm.value;
 console.log(data)


 this.os.CreateOrder(data).subscribe((res:any)=>{
  console.log(res);



})


}

profile(){
  this.auth.getprofile().subscribe((res:any)=>{
    this.profileData=res['data'];
   console.log(this.profileData._id)
   this.orderForm.controls['user_id'].setValue(this.profileData._id)
    //  console.log(res)

  })
}
width!: number;
length!: number;
height!: number;
volumetricFactor: number = 5000; // This value may vary
ratePerUnitWeight!: number; // Define your rate per unit weight
volumetricWeight!: number;
price!: number;

calculateVolumetricWeight() {
  this.volumetricWeight = (this.width * this.length * this.height) / this.volumetricFactor;
}

calculatePrice() {
  this.calculateVolumetricWeight();
  this.price = this.volumetricWeight * this.ratePerUnitWeight;
}


handle(event:any){
  this.code=event.target.value;
  this.http.get(`https://api.postalpincode.in/pincode/${this.code}`).subscribe((res:any)=>{
    this.data=res[0]?.PostOffice[0];
    console.log(this.data)
    console.log(this.data?.Name);
    this.orderForm.controls['city'].setValue(this.data?.Name);
    this.orderForm.controls['state'].setValue(this.data?.State)
  })
}

}
