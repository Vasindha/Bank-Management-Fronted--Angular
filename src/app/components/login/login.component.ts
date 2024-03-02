import { Component, EventEmitter, Output, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IUser } from '../../models/user_model';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService:AuthService,private toaster:ToastrService,private router:Router){}

  form: IUser = {
    userName: "",
    password: "",
    role: 1
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  login(){
    this.authService.login(this.form).subscribe(res => {
     localStorage.setItem('token',res);
     this.authService.checkStatus();
    },
    (error) => {
      console.log(error)
      this.toaster.error(error.error,"Error")
    }
    )
  }
}
