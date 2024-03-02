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
import { AuthService } from '../../services/auth.service';

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
    private toaster: ToastrService,
    private authService:AuthService
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
  addNewAccountData :IAccount={
    accountNumber: 0,
    customerId: 0,
    accountType: 0,
    amount:0,
    interestRate: 0,
    openDate: null,
    accountStatus: 0
  }
  
  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator!;
  
  }
  ngOnInit(): void {
    
    this.route.paramMap.subscribe(
      (params) => (this.customerId = Number(params.get('id')))
    );

    this.customerService.getAccountData(this.customerId).subscribe((data) => {
      this.accountData = data;
      this.dataSource.data = data;
    },
    
    (error)=> {
     
      
      this.toaster.error(error.error,"Error");
      
    });
  }
  changeStatus(accountNumber: number) {
    this.accountServce.deactiveAccount(accountNumber).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (error) => {
        this.toaster.error(error.error,"Error")
      }
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

addNewAccount(){
  
  this.addNewAccountData.accountType = this.accountType;
  this.addNewAccountData.customerId = this.customerId;
  this.addNewAccountData.openDate = this.accountData[0].openDate;
  
  
  this.accountServce.addAccount(this.addNewAccountData).subscribe(res => {
    this.toaster.success(res, 'Success');
    this.ngOnInit();
  },
  (error) => {
    
    this.toaster.error(error['error'], 'Error');
  }
  )
}

  
}
