import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount } from '../models/account_model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService:HttpClient) { }
accountUrl = "https://localhost:7114/api/Account"

addAccount(account:IAccount):Observable<string>{
  return this.httpService.post(`${this.accountUrl}/Account`,account,{responseType:'text'})
}

  deactiveAccount(accountNumber:number):Observable<string>{
    return this.httpService.put(this.accountUrl,accountNumber,{responseType:'text'})
  }

  deleteAccount(accountNumber:number):Observable<string>{
    return this.httpService.delete(`${this.accountUrl}/${accountNumber}`,{responseType:'text'})
  }
}
