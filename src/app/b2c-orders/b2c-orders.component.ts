import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewChecked, CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-b2c-orders',
  standalone: true,
  imports: [CommonModule, 
  RouterOutlet, RouterModule,ReactiveFormsModule,MatFormFieldModule,MatButtonModule,MatMenuModule,MatGridListModule,MatIconModule,MatTableModule,ForwardCreateComponent,MatPaginatorModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './b2c-orders.component.html',
  styleUrls: ['./b2c-orders.component.css']
})
export class B2cOrdersComponent implements OnInit {
  displayedColumns: string[] = ['order', 'orderType','Address','city','companyName','fname','lname','length','width', 'product', 'payment', 'phone', 'state'];
  orderData:any;
  profileData:any;
   searchForm!:FormGroup;
   searchId:any;
  dataSource = new MatTableDataSource<any>([]);
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


   constructor(private od:MyorderService,private auth:AuthService,private sf:FormBuilder) {
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
  this.od.getData().subscribe((res:any)=>{
    console.log(res);
this.orderData=res;


this.dataSource = new MatTableDataSource<any>(res.data);
this.dataSource.paginator = this.paginator;




 
  })
  
 }


}
