import { Component } from '@angular/core';
import { AfterViewChecked, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MyorderService } from '../serices/myorder.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { ForwardCreateComponent } from '../forward-create/forward-create.component';
import { AuthService } from '../serices/auth.service';
import { LoaderService } from '../serices/loader/loader.service';
@Component({
  selector: 'app-weightreco',
  standalone: true,
  imports: [CommonModule, 
  RouterOutlet, RouterModule,ReactiveFormsModule,MatFormFieldModule,MatButtonModule,MatMenuModule,MatGridListModule,MatIconModule,MatTableModule,ForwardCreateComponent,MatPaginatorModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './weightreco.component.html',
  styleUrls: ['./weightreco.component.css']
})
export class WeightrecoComponent {
  // constructor () {
  //   this.filteredOrderList=this.orders
  // }
  orders: any = [
    {
      weightAppliedDate: '2023-11-14',
      awbNumber: 'bluedart Express 76878769925',
      orderId: '169873031',
      enteredWeight: 'Dead Weight 200g LxBxH:1*1*1 Charged Slab 500g Volumetric Weight 0g',
      appliedWeight: 'Applied Slab:1000g',
      weightCharges: 'Forward:Rs.80 Charged to wallet:No',
      product: 'DOX()',
      status: 'Dispute Closed'
    },
    {
      weightAppliedDate: '2023-11-14',
      awbNumber: 'Bluedart Express',
      orderId: '1698741049',
      enteredWeight: 'Dead Weight 0.062g LxBxH:1*1*1 Charged Slab 500g Volumetric Weight 0g',
      appliedWeight: 'Applied Slab:1000g',
      weightCharges: 'Forward:Rs.80 Charged to walet:No',
      product: 'POOJA COIN(COOPER)()',
      status: 'Dispute Open'
    },
    {
      weightAppliedDate: '2023-11-07',
      awbNumber: 'Bluedartair IND RAS 81424044122',
      orderId: '1698294443',
      enteredWeight: 'Dead Weight 200g LxBxH:1*1*1 Charged Slab 500g Volumetric Weight 0g',
      appliedWeight: 'Applied Slab:1000g',
      weightCharges: 'forward:RS.81 Charged to wallet:Yes',
      product: 'DOX()',
      status: 'Dispute Closed'
    },
    // Add more orders here...
  ];
  filteredOrderList:any=[];
  showByStatus(status:string): void {
      if(status == 'All'){
        this.filteredOrderList=[...this.orders]
      }
      else{
        this.filteredOrderList=this.orders.filter((order: { status: string; }) => order.status === status);
      }
  }
  showByAction(actionName: string): void {
    this.filteredOrderList = this.orders.filter((order: { action: string; }) => order.action === actionName);
  }

  displayedColumns: string[] = ['order', 'orderType','Address','city','companyName','fname','lname','length','width', 'product', 'payment', 'phone', 'state'];
  orderData:any;
  profileData:any;
   searchForm!:FormGroup;
   searchId:any;
  dataSource = new MatTableDataSource<any>([]);
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hide = true;
  loading$ = this.loader.loading$;

   constructor(private od:MyorderService,private auth:AuthService,private sf:FormBuilder,public loader:LoaderService) {
    this.searchForm=this.sf.group({
      searchId:''
    })
    this.filteredOrderList=this.orders
  
  }
  ngOnInit(){
  this.getOrderlist();
  this.getProfile();
 
  
  }

  getProfile(){
    this.auth.getprofile().subscribe((res:any)=>{
      this.profileData=res['data'];
       console.log(res)
     

       this.searchForm.controls['searchId'].setValue(this.profileData._id)
       this.dataSource.filter =   this.profileData?._id;
  
       const filteredRows = this.dataSource.filteredData;
       console.log(filteredRows?.length);
      
    })
    } 
    
 getOrderlist(){
 
    this.loader.show()
 
 
  this.od.getData().subscribe((res:any)=>{
    console.log(res);
this.orderData=res;
this.loader.hide()

this.dataSource = new MatTableDataSource<any>(res.data);
this.dataSource.paginator = this.paginator;




 
  })
  
 }
}
