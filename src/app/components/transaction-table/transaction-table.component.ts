import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { ITransaction } from '../../models/transaction_model';
import { formatNumber } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.scss',
})
export class TransactionTableComponent implements AfterViewInit {
  transactionData: ITransaction[] = [];
  accountNumber!: number;
  displayedColumns = [
    'ACCOUNT NUMBER',
    'RECEVIER',
    'TRANSACTION DATE',
    'TRANSACTION TYPE',
    'TRANSACATION AMOUNT',
    'DESCRIPTION',
  ];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  dataSource = new MatTableDataSource<ITransaction>(this.transactionData);
  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) {}
refresh(){
  this.ngOnInit();
  this.ngAfterViewInit();
}
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (data) => (this.accountNumber = Number(data.get('id')))
    );

    this.transactionService
      .getTransactionsByAccountNumber(this.accountNumber)
      .subscribe((data) => {
        this.transactionData = data;
        this.dataSource.data = data;
        console.log(this.dataSource);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }
}
