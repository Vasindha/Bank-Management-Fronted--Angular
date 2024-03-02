import { Component, Inject, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CustomerService } from '../../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { ICustomer } from '../../models/customer_model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent implements OnInit{

  constructor(private customerService:CustomerService,private toaster:ToastrService, 
    @Inject(MAT_DIALOG_DATA) public data: number){}
  ngOnInit(): void {
    this.customerId = this.data;
  }
  customerId!:number;

  deleteAccount(){
    this.customerService.deleteCustomer(this.customerId).subscribe((data) => {
      this.toaster.success(data, 'Customer Deleted');
      this.ngOnInit();
    },
    
    error => {
      this.toaster.error(error.error,"Error")
    });
  }
}
