import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ForwardCreateComponent } from '../forward-create/forward-create.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AuthService } from '../serices/auth.service';
import { LoaderService } from '../serices/loader/loader.service';
import { MyorderService } from '../serices/myorder.service';

@Component({
  selector: 'app-exception',
  standalone: true,
  imports: [CommonModule, 
  RouterOutlet, RouterModule,ReactiveFormsModule,MatFormFieldModule,MatButtonModule,MatMenuModule,MatGridListModule,MatIconModule,MatTableModule,MatPaginatorModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.css']
})
export class ExceptionComponent {

  // constructor() {
  //   this.filteredOrderList=[...this.orders]
  // }
       
  orders = [
    {
      channel: 'custom',
      ndrDate: '2023-11-13',
      order: '1699678797',
      product: 'book',
      payment: '1000(prepared)',
      customer: 'RAVEENA KAKU... 9017290688',
      carrier: 'BLUEDART SURFASE 76888978806',
      status: 'DELIVERED',
      tags: '',
      exceptionInfo: '1 attempt(s) show history',
      action: 'RE ATTEMPT'
    },
    {
      channel: 'custom',
      ndrDate: '2023-11-06',
      order: '1698911355',
      product: 'dox',
      payment: '500(prepared)',
      customer: 'SRIJAN RAYC... 9920083669',
      carrier: 'BLUEDART EXPRESS 76880680634',
      status: 'DELIVERED',
      tags: '',
      exceptionInfo: '1 Attempt(s) CNEE REFUSED ID/OTP NOT SHARED-INCORRECT show History',
      action: '-'
    },
    {
      channel: 'custom',
      ndrDate: '2023-11-01',
      order: '1698477138',
      product: 'LAPTOP AND...',
      payment: '5000(Prepared)',
      customer: 'SHEEL OLDME... 8626904555',
      carrier: 'BLUEDART EXPRESS',
      status: '',
      tags: '',
      exceptionInfo: '1 Attempt(s) ADDRESS UNLOCATABLE; CANNOT DELIVERED show History',
      action: '-'
    },
    // Add three more orders similarly
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
    this.filteredOrderList = this.orders.filter(order => order.action === actionName);
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
    this.filteredOrderList=[...this.orders]
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
