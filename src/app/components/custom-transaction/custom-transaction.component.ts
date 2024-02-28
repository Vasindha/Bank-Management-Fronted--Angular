import { TransactionService } from './../../services/transaction.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ITransaction } from '../../models/transaction_model';
import { ToastrService } from 'ngx-toastr';
import { router } from 'ngx-bootstrap-icons';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-custom-transaction',
  templateUrl: './custom-transaction.component.html',
  styleUrl: './custom-transaction.component.scss',
})
export class CustomTransactionComponent implements OnInit {
  @ViewChild(TransactionTableComponent, { static: false })
  transactionTable!: TransactionTableComponent;
  setransactionBox: boolean = false;
  isTransactionBtn = false;
  transactionColumn = [
    'TRANSACTION DATE',
    'TRANSACTION TYPE',
    'TRANSACATION AMOUNT',
    'DESCRIPTION',
  ];
  accountNumber!: number;
  transactionData: ITransaction = {
    transactionId: null,
    accountNumber: null,
    transactionDate: null,
    tansactionType: 0,
    transactionAmount: null,
    transactionDescription: '',
    receiverAccountNumber: null,
  };

  constructor(
    private transactionService: TransactionService,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  toggle() {
    this.setransactionBox = !this.setransactionBox;
  }

  doTransaction() {
    this.isTransactionBtn = true;
    if (this.transactionData.tansactionType == 2) {
      this.transactionService.doTransfer(this.transactionData).subscribe(
        (res) => {
          this.toaster.success(res, 'SUCCESS');
          this.isTransactionBtn = false;
        },
        (error) => {
          this.toaster.error(error['error'], 'ERROR');
          this.isTransactionBtn = false;
          this.ngOnInit();
        }
      );
    } else {
      this.transactionService.doTransaction(this.transactionData).subscribe(
        (res) => {
          this.toaster.success(res, 'SUCCESS');
          this.accountNumber = this.transactionData.accountNumber!;

          this.isTransactionBtn = false;
        },
        (error) => {
          this.toaster.error(error['error'], 'ERROR');
          this.isTransactionBtn = false;
          this.ngOnInit();
        }
      );
    }
  }
}
