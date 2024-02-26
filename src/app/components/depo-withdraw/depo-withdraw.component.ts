import { Component, Inject, OnInit } from '@angular/core';
import { ITransaction } from '../../models/transaction_model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from '../../services/transaction.service';
@Component({
  selector: 'app-depo-withdraw',
  templateUrl: './depo-withdraw.component.html',
  styleUrl: './depo-withdraw.component.scss',
})
export class DepoWithdrawComponent {
  constructor(
    public dialogRef: MatDialogRef<DepoWithdrawComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionService: TransactionService,
    private toaster: ToastrService
  ) {}

  transactionData: ITransaction = {
    transactionId: null,
    accountNumber: this.data['accountNumber'],
    transactionDate: null,
    tansactionType: 0,
    transactionAmount: null,
    transactionDescription: '',
  };
 

  doTransaction() {
    this.transactionService.doTransaction(this.transactionData).subscribe(
      (response) => {
        this.toaster.success(response, 'Success');

        
      },
      (error) => {
        this.toaster.error(error['error'], 'ERROR');
      }
    );
  }
}
