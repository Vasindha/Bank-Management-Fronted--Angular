import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
})
export class CustomerTableComponent implements OnInit, AfterViewInit {
  customerData!: ICustomer[];
  isLoad = true;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  dataSource = new MatTableDataSource<ICustomer>(this.customerData);
  displayedColumns: string[] = [
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

  customerName!: string;
  aadharPattern = '^[0-9]{12}$';
  namePattern = '^[a-zA-Z]+';
  constructor(
    private customerService: CustomerService,
    private router: ActivatedRoute,
    private toaster: ToastrService,
    private rout: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomerData().subscribe(
      (data) => {
        this.isLoad = false;
        this.customerData = data;

        this.dataSource.data = this.customerData;
      },
      (error) => {
        this.isLoad = true;
        this.toaster.error(error.error, 'Error');
      }
    );
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator!;
  }
  openEdit(custData: ICustomer) {
    let dialogRef = this.dialog.open(UpdateCustomerComponent, {
      height: '60%',
      width: '60%',
      data: custData,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
  }

  openDelete(customerId: number) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      height: '30%',
      data: customerId,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
  }

  navigateToAccount(customerId: number, customerAadhar: number) {
    this.rout.navigate(['/account', customerId], {});
  }
}
