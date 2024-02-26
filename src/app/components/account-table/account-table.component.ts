import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccount } from '../../models/account_model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DepoWithdrawComponent } from '../depo-withdraw/depo-withdraw.component';
import { AccountService } from '../../services/account.service';
import { ICustomer } from '../../models/customer_model';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrl: './account-table.component.scss',
})
export class AccountTableComponent implements OnInit {
element: any;
  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private accountServce: AccountService,
    private toaster: ToastrService
  ) {}
  accountData: IAccount[] = [];
  @ViewChild(MatPaginator) paginator?:MatPaginator;
  dataSource = new MatTableDataSource<IAccount>(this.accountData);
  displayedColumns = [
    'ACCOUNT_NUMBER',
    'ACCOUNT_TYPE',
    'ACCOUNT STATUS',
    'BALANCE',
    'OPEN DATE',
    'INTEREST RATE',
    'ACTION',
    'TRANSACTIONS',

    'CHANGE STATUS',
  ];
 
  customerId!: number;
  accountType = 0;
  addAccountData: ICustomer = {
    customerId: null,
    customerFirstname: '',
    customerMiddletname: '',
    customerLastname: '',
    customerAddress: '',
    customerDob: '',
    customerMobileno: 98,
    customerEmail: '',
    customerAadharno: null,
    accountType: null,
  };
  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator!;
  
  }
  ngOnInit(): void {
    this.route.fragment.subscribe((addhar) => {
      console.log(addhar, 'this is');
      this.addAccountData.customerAadharno = Number(addhar);
    });
    this.route.paramMap.subscribe(
      (params) => (this.customerId = Number(params.get('id')))
    );

    this.customerService.getAccountData(this.customerId).subscribe((data) => {
      this.accountData = data;
      this.dataSource.data = data;
    });
  }
  changeStatus(accountNumber: number) {
    this.accountServce.deactiveAccount(accountNumber).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (error) => {}
    );
  }

  openDialog(accountNumber: number) {
    let dialogRef = this.dialog.open(DepoWithdrawComponent, {
      width: '50%',
      height: '50%',
      data: {
        accountNumber: accountNumber,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  addAccount() {
    this.addAccountData.customerDob = this.accountData[0].openDate;
    this.addAccountData.accountType = this.accountType;

    this.customerService.addCustomerData(this.addAccountData!).subscribe(
      (res) => {
        this.toaster.success(res, 'Success');
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        this.toaster.error(error['error'], 'Error');
      }
    );
  }
}
