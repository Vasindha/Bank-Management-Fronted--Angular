import { ITransaction } from './../models/transaction_model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpService:HttpClient) { }

  transactionUrl = "https://localhost:7114/api/Transaction"

  getTransactionsByAccountNumber(accountNumber:number):Observable<ITransaction[]>{
    return this.httpService.get<ITransaction[]>(`${this.transactionUrl}/${accountNumber}`)
  }
  
  getTransactionByTransactinId(transacationId:number):Observable<ITransaction>{
    return this.httpService.get<ITransaction>(`${this.transactionUrl}/transactionId/${transacationId}`)
  }
  getAllTransactions():Observable<ITransaction[]>{
    return this.httpService.get<ITransaction[]>(this.transactionUrl);
  }

  doTransaction(transactionData:ITransaction):Observable<string>{
    return this.httpService.post(`${this.transactionUrl}/Deposite`,transactionData,{responseType:'text'})
  }
  doTransfer(transactionData:ITransaction):Observable<string>{
    return this.httpService.post(`${this.transactionUrl}/Transfer`,transactionData,{responseType:'text'})
  }
}
