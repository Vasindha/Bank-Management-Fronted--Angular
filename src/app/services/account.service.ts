import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService:HttpClient) { }
accountUrl = "https://localhost:7114/api/Account"


  deactiveAccount(accountNumber:number):Observable<string>{
    return this.httpService.put(this.accountUrl,accountNumber,{responseType:'text'})
  }

  deleteAccount(accountNumber:number):Observable<string>{
    return this.httpService.delete(`${this.accountUrl}/${accountNumber}`,{responseType:'text'})
  }
}
