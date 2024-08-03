import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
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
import { AuthService } from '../serices/auth.service';
import { LoaderService } from '../serices/loader/loader.service';

@Component({
  selector: 'app-b2b-orders',
  standalone: true,
  imports: [CommonModule, 
  RouterOutlet, RouterModule,ReactiveFormsModule,MatFormFieldModule,MatButtonModule,MatMenuModule,MatGridListModule,MatIconModule,MatTableModule,MatPaginatorModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './b2b-orders.component.html',
  styleUrls: ['./b2b-orders.component.css']
})
export class B2bOrdersComponent {
  
  // customers: any = [

  //   {
  //     channel: 'Online',
  //     order: 'ORD001',
  //     date: '2023-12-20',
  //     product: 'Product A',
  //     payment: 'Credit Card',
  //     method: 'Online',
  //     customer: 'John Doe',
  //     phone: '123-456-7890',
  //     weight: 1.5,
  //     ivrStatus: 'Completed',
  //     tags: 'Tag1',
  //     status: 'Delivered'
  //   },

  // ];
  // filteredCustomers: any = [];

  // constructor() {
  //   this.filteredCustomers = this.customers;
  // }

  // showOrdersByStatus(status: string): void {
  //   if (status === 'All') {
  //     this.filteredCustomers = this.customers;
  //   } else {
  //     this.filteredCustomers = this.customers.filter((customer: { status: string; }) => customer.status === status);
  //   }
  // }

  // countOrdersByStatus(status: string): number {
  //   return this.customers.filter((customer: { status: string; }) => customer.status === status).length;
  // }

  // noRecordsFound: boolean = false;

  // // Method to check if there are no records
  // checkNoRecords(): void {
  //   this.noRecordsFound = this.customers.length === 0;
  // }
  displayedColumns: string[] = ['CHANNEL', 'orderType','Address','city','companyName','fname','lname','length','width', 'product', 'payment', 'phone', 'state'];
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
