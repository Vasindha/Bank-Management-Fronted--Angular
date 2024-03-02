import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../services/customer.service';
import { ICustomer } from '../../models/customer_model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss',
})
export class AddAccountComponent {
  custData: ICustomer = {
    accountType: 0,
    customerId: null,
    customerFirstname: '',
    customerMiddletname: '',
    customerLastname: '',
    customerAddress: '',
    customerDob: null,
    customerMobileno: null,
    customerEmail: '',
    customerAadharno: null,
  };
isLoadbtn:boolean = false;
  mobilePattern = '^[0-9]{10}$';
  aadharPattern = '^[0-9]{12}$';
  emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  constructor(
    private userService: CustomerService,
    private toast: ToastrService,
    private authService:AuthService
  ) {}

  onSubmit() {
    this.isLoadbtn = true;
    this.userService.addCustomerData(this.custData).subscribe((data) => {
     
      this.toast.success('Added Successfully!', 'Success', 
      
      );
      this.isLoadbtn = false;
    },
    
    error => {
     
      this.toast.error(error['error'],"Error")
      this.isLoadbtn = false;
     
      this.toast.error(error.error,"Error");
      
    });
  }
}
