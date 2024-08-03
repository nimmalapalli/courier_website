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
  selector: 'app-b2b-shipments',
  standalone: true,
  imports: [CommonModule, 
  RouterOutlet, RouterModule,ReactiveFormsModule,MatFormFieldModule,MatButtonModule,MatMenuModule,MatGridListModule,MatIconModule,MatTableModule,MatPaginatorModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './b2b-shipments.component.html',
  styleUrls: ['./b2b-shipments.component.css']
})
export class B2bShipmentsComponent {
  displayedColumns: string[] = ['order', 'orderType','Address','city','companyName','fname','lname','length','width', 'product', 'payment', 'phone', 'state'];
  orderData:any;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  shipments:any=[
    { channel: 'Custom', orderID: 1699678797	, date: '2023/11/11',product:'BOOK',payment:500,pMethod:'PREPAID',customer:'RAVEEN',carrier:'Bluedart Surface',AWB:76888978806,status:'Delivered'},
    { channel: 'Custom', orderID: 1699884092, date: '2023/11/13',product:'HOUSEHOLD	',payment:10000,pMethod:'PREPAID',customer:'SUSHMA',carrier:'Delhivery Surface 5 K.G',AWB:4270712113521,status:'In Transit'},
    { channel: 'Custom', orderID: 1699938742, date: '2023/11/14',product:'MARBLE STATUE',payment:2000,pMethod:'PREPAID',customer:'PANKAJ KUMA...',carrier:'Delhivery Surface 5 K.G',AWB:4270712113871,status:'Cancelled'},
  ];
 
  fliterShipments:any=[];
  showFilters: boolean = false; 
  selectedStatus: string = ''; // Property to hold the selected status

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
  
  filterStatus(status:string) {

    this.selectedStatus = status;
    if (status === 'All') {
      this.fliterShipments = this.shipments; // Show all shipments
    } else {
      this.fliterShipments = this.shipments.filter((shipment: { status: string; }) => shipment.status === status);
    }
  }
  getStatusButtonClass(status: string): string {
    return status === 'Cancelled' ? 'btn btn-outline-danger btn-sm ' : 'btn btn-outline-info btn-sm';
  }
  constructor(private od:MyorderService,private auth:AuthService,private sf:FormBuilder,public loader:LoaderService) {
    this.fliterShipments=[...this.shipments]
  
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