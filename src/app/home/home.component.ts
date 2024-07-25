import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NavbarService } from '../serices/navbar.service';
import { Navbar2Service } from '../serices/navbar2.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from '../register/register.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import { MyorderService } from '../serices/myorder.service';
import { AuthService } from '../serices/auth.service';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, 
  RouterOutlet, RouterModule,ReactiveFormsModule,MatFormFieldModule,MatButtonModule,MatInputModule,MatCardModule,MatIconModule,RegisterComponent,MatMenuModule,MatGridListModule,MatIconModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  displayedColumns: string[] = ['order', 'orderType','Address','city','companyName','fname','lname','length','width', 'product', 'payment', 'phone', 'state'];
  orderData:any;
  profileData:any;
   searchForm!:FormGroup;
   searchId:any;
  dataSource = new MatTableDataSource<any>([]);
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize = 5;
  totalorders:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 cards:any;
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  getdata(){

  
 this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Total Ammount', cols: 4, rows: 1,totals:''},
          { title: 'Total Orders', cols: 4, rows: 1 ,totals:this.totalorders},
          { title: 'Card 3', cols: 4, rows: 1 ,totals:''},         
          { title: 'Card 4', cols: 4, rows: 1,totals:''},
          { title: 'Card 4', cols: 2, rows: 1,totals:''},
          { title: 'Card 4', cols: 2, rows: 1,totals:''}
        ];
      }

      return [
        { title: 'Total Ammount', cols: 1, rows: 1,totals:'' },
        { title: 'Total Orders', cols: 1, rows: 1 ,totals:this.totalorders},
        { title: 'Card 3', cols: 1, rows: 1,totals:'' },
        
        { title: 'Card 4', cols: 1, rows: 1,totals:'' },
        { title: 'Card 4', cols: 2, rows: 2,totals:'' },
        { title: 'Card 4', cols: 2, rows: 2,totals:'' }
      ];
    })
  );
  
}
isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  

  
  
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
        this.totalorders = (filteredRows?.length)
        this.getdata();
         console.log(this.totalorders);
         
        
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
