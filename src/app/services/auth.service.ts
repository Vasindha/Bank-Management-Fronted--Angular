import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user_model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl = 'https://localhost:7114/api/Auth';
  constructor(private httpService:HttpClient) { }
private isLoggedInSubject = new BehaviorSubject<boolean>(false);
isLoggedIn = this.isLoggedInSubject.asObservable();

checkStatus(){
  const token = localStorage.getItem('token');

  if(token?.length == 0){
    this.isLoggedInSubject.next(false);
    
  }else{
    this.isLoggedInSubject.next(true);
  }
}

  login(user:IUser):Observable<string>{
    return this.httpService.post(`${this.baseUrl}/Login`,user,{responseType:'text'});
  }

  signUp(user:IUser):Observable<string>{
    return this.httpService.post(`${this.baseUrl}/SignUp`,user,{responseType:'text'})
  }

  logOut(){
    localStorage.setItem('token',"");
    this.isLoggedInSubject.next(false);
  }

  
}
