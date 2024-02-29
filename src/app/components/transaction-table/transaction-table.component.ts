import { ITransaction } from './../../models/transaction_model';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ActivatedRoute } from '@angular/router';

import { formatNumber } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import  'jspdf-autotable';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
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

 generatePdf(){
  let pdf = new jsPDF();
  let startY =10;
  for(var i=0;i<this.transactionData.length;i++){

    pdf.setTextColor(0,0,0);
   if(startY+60 > pdf.internal.pageSize.height){
    pdf.addPage();
    startY = 10;
   }
    pdf.text("Transaction Date:-"+this.transactionData[i].transactionDate+"",10,10+startY ,{align:'left'});
    
    pdf.text("Transaction Description:-"+this.transactionData[i].transactionDescription+"",10,30+startY);
    pdf.text("Transaction Id:"+this.transactionData[i].transactionId+"",10,40+startY);
    if(this.transactionData[i].tansactionType == 0){
      if(this.transactionData[i].receiverAccountNumber == null){
        pdf.text("Transfer From Bank",10,50+startY);
        
      }else{
        pdf.text("Transfer From:"+this.transactionData[i].receiverAccountNumber+"",10,50+startY);
      }
      pdf.setTextColor(0,128,0)
      pdf.text("Transaction Amount: +Rs."+this.transactionData[i].transactionAmount+"/-",10,20+startY,);
      
    }else{
      if(this.transactionData[i].receiverAccountNumber == null){
        pdf.text("Transfer To Bank",10,50+startY);
      }else{
        pdf.text("Transfer To:"+this.transactionData[i].receiverAccountNumber+"",10,50+startY);
      }
      pdf.setTextColor(255,0,0)
      pdf.text("Transaction Amount: -Rs."+this.transactionData[i].transactionAmount+"/-",10,20+startY,);
    }
pdf.setTextColor(0,0,0);

    pdf.text("------------------------------------------------------------",10,startY+60)
    startY+=60;
  }
  pdf.save(this.accountNumber+'statement.pdf')
 }
}
