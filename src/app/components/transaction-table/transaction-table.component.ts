import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { ITransaction } from '../../models/transaction_model';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.scss',
})
export class TransactionTableComponent {
  transactionData!: ITransaction[];
  accountNumber!: number;
  transactionColumn = [
    'TRANSACTION DATE',
    'TRANSACTION TYPE',
    'TRANSACATION AMOUNT',
    'DESCRIPTION',
  ];

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    
    
    this.route.paramMap.subscribe(
      (data) => (this.accountNumber = Number(data.get('id')))
    );

    this.transactionService
      .getTransactionsByAccountNumber(this.accountNumber)
      .subscribe((data) => {
        
        this.transactionData = data;
      });
  }
}
