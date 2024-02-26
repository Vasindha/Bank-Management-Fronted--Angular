import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { ICustomer } from '../../models/customer_model';
import { CustomerService } from '../../services/customer.service';



@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements AfterViewInit,OnInit{
 
  ngOnInit(): void {
    
    this.customerService.getCustomerData().subscribe((data) => {
      this.customerData = data;
      this.dataSource.data = this.customerData;
     
    });
  }
  customerData!:ICustomer[] ;
  displayedColumns: string[] =[
    'CUSTOMER_NAME',
    'CUSTOMER_ADDRESS',
    'MOBILE',
    'AADHAR_NO',
    'EMAIL',
    'DATE_OF_BIRTH',
    'ACCOUNT',
    'EDIT',
    'DELETE',
  ];
  @ViewChild(MatPaginator) paginator?:MatPaginator;
  dataSource = new MatTableDataSource<ICustomer>(this.customerData);


constructor(private customerService:CustomerService){}

  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator!;
  
  }
}
