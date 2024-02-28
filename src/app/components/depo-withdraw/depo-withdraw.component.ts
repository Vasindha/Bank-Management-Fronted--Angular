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

transactionData!:ITransaction;
  constructor(
    public dialogRef: MatDialogRef<DepoWithdrawComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionService: TransactionService,
    private toaster: ToastrService
  ) {
    this.transactionData= {
      transactionId: null,
      accountNumber: this.data['accountNumber'],
      transactionDate: null,
      tansactionType: 0,
      transactionAmount: null,
      transactionDescription: '',
      receiverAccountNumber: null
    };
   

  }
 


 

  doTransaction() {
    if(this.transactionData.tansactionType == 2){
      this.transactionService.doTransfer(this.transactionData).subscribe(res => {
        this.toaster.success(res,"Success")
      },
      (error) => {
        this.toaster.error(error.error,"Error")
      }
      )
    }
else{
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
}
