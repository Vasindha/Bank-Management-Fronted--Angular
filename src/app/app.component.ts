import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  title = 'bank_management';
  
  isLogin = false;
 constructor(private authService:AuthService){

 }
  ngOnInit(): void {
    this.authService.checkStatus();
   this.authService.isLoggedIn.subscribe(status =>{
    this.isLogin = status;
   })
   console.log(this.isLogin);
   
  }

  
}
