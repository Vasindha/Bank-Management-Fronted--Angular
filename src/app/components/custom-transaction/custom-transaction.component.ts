import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ITransaction } from '../../models/transaction_model';
import { ToastrService } from 'ngx-toastr';
import { router } from 'ngx-bootstrap-icons';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-custom-transaction',
  templateUrl: './custom-transaction.component.html',
  styleUrl: './custom-transaction.component.scss'
})
export class CustomTransactionComponent implements OnInit{

  setransactionBox:boolean = false;

  transactionColumn=['TRANSACTION DATE','TRANSACTION TYPE','TRANSACATION AMOUNT','DESCRIPTION']
  accountNumber!:number;
  transactionData : ITransaction ={
    transactionId: null,
    accountNumber: null,
    transactionDate: null,
    tansactionType: 0,
    transactionAmount: null,
    transactionDescription: ""
  };

  constructor(private transactionService:TransactionService,private toaster:ToastrService,private router:Router,private route : ActivatedRoute){}
ngOnInit(): void {
 
}

toggle(){
  this.setransactionBox = !this.setransactionBox;
}




doTransaction(){
  this.transactionService.doTransaction(this.transactionData).subscribe(res => {
    this.toaster.success(res,"SUCCESS");
      this.accountNumber = this.transactionData.accountNumber!;
    
  

  },
  error => {
    this.toaster.error(error['error'],"ERROR")
    this.ngOnInit();
  }
  )
}
}
