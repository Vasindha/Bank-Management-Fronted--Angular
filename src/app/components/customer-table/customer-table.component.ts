import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ICustomer } from '../../models/customer_model';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DepoWithdrawComponent } from '../depo-withdraw/depo-withdraw.component';
import { ToastrService } from 'ngx-toastr';

import { MatDialog } from '@angular/material/dialog';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
})
export class CustomerTableComponent implements OnInit ,AfterViewInit {
  customerData!: ICustomer[];
  @ViewChild(MatPaginator) paginator?:MatPaginator;
  dataSource = new MatTableDataSource<ICustomer>(this.customerData);
  displayedColumns :string[]= [
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
  data!: { id: number; name: string };
  customerAadhar!: number;
  customerAccount!: number;
  customerName!: string;
  aadharPattern = '^[0-9]{12}$';
  namePattern = '^[a-zA-Z]+';
  constructor(
    private customerService: CustomerService,
    private router: ActivatedRoute,
    private toaster: ToastrService,
    private rout: Router,
    private dialog: MatDialog
  ) {}
 

  ngOnInit(): void {
    this.customerService.getCustomerData().subscribe((data) => {
      this.customerData = data;
     
      this.dataSource.data = this.customerData
      console.log(this.dataSource)
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator!;
  }
  openEdit(custData: ICustomer) {
    // this.editService.setData(custData);
    let dialgoRef = this.dialog.open(UpdateCustomerComponent, {
      height: '60%',
      width: '60%',
      data: custData,
    });
    dialgoRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
  }

  openDelete(customerId: number) {
    let dialgoRef= this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      height: '30%',
      data:customerId
    });
    dialgoRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
    
  }

  

  navigateToAccount(customerId: number, customerAadhar: number) {
    this.rout.navigate(['/account', customerId], {
      fragment: customerAadhar.toString(),
    });
  }
}
