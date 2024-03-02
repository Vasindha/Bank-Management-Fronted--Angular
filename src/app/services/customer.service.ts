import { Injectable } from '@angular/core';
import { ICustomer } from '../models/customer_model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { IAccount } from '../models/account_model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerUrl ="https://localhost:7114/api/Customer";

  private addAccountUrl = "https://localhost:7114/api/Account";
 
  
 
    constructor(private httpService:HttpClient) { 
      
    }
    getCustomerData():Observable<ICustomer[]>{
      return this.httpService.get<ICustomer[]>(this.customerUrl);
    }
  
    addCustomerData(data:ICustomer):Observable<any>{
        return this.httpService.post(this.addAccountUrl,data,{responseType:'text'}).pipe(catchError((error)=>{
          
          throw new Error("Internal server Error")
        }));
    }
  
    getAccountData(customerId:number):Observable<IAccount[]>{
      return this.httpService.get<IAccount[]>(`${this.customerUrl}/${customerId}`);
    }
   

    getCustomerDetailsById(customerId:number):Observable<ICustomer>{
      return this.httpService.get<ICustomer>(`${this.customerUrl}/${customerId}`)
    }
    getCustomerByAadhar(aacharNo:number):Observable<ICustomer>{
      return this.httpService.get<ICustomer>(`${this.customerUrl}/aadhar/${aacharNo}`)
    }

    getCustomerByName(name:string):Observable<ICustomer[]>{
      return this.httpService.get<ICustomer[]>(`${this.customerUrl}/${name}`)
    }
  
    deleteCustomer(customerId:number):Observable<any>{
      return this.httpService.delete(`${this.customerUrl}/${customerId}`,{responseType:'text'})
    }
    updateCustomer(customerId:number,data:ICustomer):Observable<any>{
      return this.httpService.put(`${this.customerUrl}/${customerId}`,data,{responseType:'text'});
    }
}
