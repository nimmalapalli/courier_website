import { CUSTOM_ELEMENTS_SCHEMA, Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../nav/nav.component';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../serices/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
declare var Razorpay: any;
@Component({
  selector: 'app-rechargedialog',
  imports: [CommonModule, 
    RouterOutlet, RouterModule,ReactiveFormsModule,FormsModule,MatFormFieldModule,MatButtonModule,MatInputModule,MatCardModule,MatIconModule,MatSelectModule],
    standalone: true,
  templateUrl: './rechargedialog.component.html',
  styleUrls: ['./rechargedialog.component.scss']
})
export class RechargedialogComponent  {
  paymentid:any;
  paymentform!:FormGroup;
  inputValue: number=1;
  phoneNo:String='';
  Name:String='';
  Email:String='';
  profileData:any;
  searchId:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private auth:AuthService,private _pf:FormBuilder) {
    this.paymentform=this._pf.group({
      searchId:'',
      amount:'',
      currency:'',
      reciept:''
    });
    this.getProfile()
  }
  getProfile(){
    this.auth.getprofile().subscribe((res:any)=>{
      this.profileData=res['data'];
       console.log(res)
     

       this.paymentform.controls['searchId'].setValue(this.profileData._id)
   console.log(this.profileData._id)
      
    })
    } 

  payment(){
    alert('')
    const data=this.paymentform.value;
    console.log(data)
    this.auth.payment(data).subscribe((res:any)=>{
     console.log(res);
     this.paymentid =res;
     debugger
     this.initiateRazorpayPayment(res.id, res.amount, res.currency);
    })
  }
  initiateRazorpayPayment(orderId: string, amount: number, currency: string) {
    const RazorpayOptions = {
      key: 'rzp_live_c9gjRSnJZSE8xC',
      amount: amount,
      currency: currency,
      name: 'joprodex private limited',
      description: 'Wallet Payment',
      order_id: orderId,
      handler: (response:any) => {
        this.verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
      },
      prefill: {
        name: '',
        email: 'nimmalapallinarendra@gmail.com',
        contact: '8340932054'
      },
      theme: {
        color: '#F37254'
      }
    };

     const successCallback= (paymentid:any) =>{
     console.log(paymentid);
    }
    const failureCallback= (e:any) =>{
     console.log(e);
    }
    Razorpay.open(RazorpayOptions,successCallback,failureCallback)
   }


    verifyPayment(paymentId: string, orderId: string, signature: string) {
    this.auth.verifyPayment(paymentId, orderId, signature)
      .subscribe((response:any) => {
        if (response.status === 'Payment verified') {
          alert('Payment Successful!');
        } else {
          alert('Payment Verification Failed!');
        }
      });
  }
  }
  // paynow(){

  //   const RazorpayOptions = {
  //    description:'Sample Razorpay Demo',
  //    currency:'INR',
  //    amount:this.paymentid.amount,
  //    name:"",
  //    key:'rzp_test_VLSc7qRsFdhdrf',
  //    image:'',
  //    order_id:this.paymentid.id,
  //     prefill:{
  //      name:this.Name,
  //      email:this.Email,
      
   
  //     },
  //     theme:{
  //      color:'#3498DB',
  //      width:'400px'
  //     },
  //     modal:{
  //      ondismiss: ()=>{
  //        console.log('dismissed')
  //      }
  //     }
  //   }
    
  //   const successCallback= (paymentid:any) =>{
  //    console.log(paymentid);
  //   }
  //   const failureCallback= (e:any) =>{
  //    console.log(e);
  //   }
  //   Razorpay.open(RazorpayOptions,successCallback,failureCallback)
  //  }
   
  //  onButtonClick(value: string) {
     
  //    this.paymentform.get('amount')?.setValue(value);
  //  }
  // var razorpayObject = new Razorpay(RazorpayOptions);
  // console.log(razorpayObject);
  // razorpayObject.on('payment.failed', function (response:any){
  //       console.log(response);
  //       alert("This step of Payment Failed");
  // });
  
  // (document.getElementById('pay-button')as HTMLElement).onclick = function(e){
    
  //     razorpayObject.open();
  //     e.preventDefault();
  // }
  // }
  // amount!: number;
  // currency: string = 'INR';
  // customerId!: string;
  // walletType!: string;

  // constructor(private auth:AuthService) {}

  // createWalletPayment() {
  //   this.auth.createWalletPayment(this.amount, this.currency, this.customerId, this.walletType)
  //     .subscribe((response:any) => {
  //       this.initiateRazorpayPayment(response.id, response.amount, response.currency);
  //     });
  // }

  // initiateRazorpayPayment(orderId: string, amount: number, currency: string) {
  //   const options = {
  //     key: 'YOUR_KEY_ID',
  //     amount: amount,
  //     currency: currency,
  //     name: 'Your Company Name',
  //     description: 'Wallet Payment',
  //     order_id: orderId,
  //     handler: (response:any) => {
  //       this.verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
  //     },
  //     prefill: {
  //       name: 'Your Name',
  //       email: 'your.email@example.com',
  //       contact: '9999999999'
  //     },
  //     theme: {
  //       color: '#F37254'
  //     }
  //   };

  //   const rzp = new Razorpay(options);
  //   rzp.open();
  // }

  // verifyPayment(paymentId: string, orderId: string, signature: string) {
  //   this.auth.verifyPayment(paymentId, orderId, signature)
  //     .subscribe((response:any) => {
  //       if (response.status === 'Payment verified') {
  //         alert('Payment Successful!');
  //       } else {
  //         alert('Payment Verification Failed!');
  //       }
  //     });
  // }

