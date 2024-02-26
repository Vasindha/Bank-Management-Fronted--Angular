import { ICustomer } from './../../models/customer_model';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { CustomerService } from '../../services/customer.service';
import { ToastrService } from 'ngx-toastr';

import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.scss',
})
export class UpdateCustomerComponent implements OnInit {
  emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  mobilePattern = '^[0-9]{10}$';
  
  constructor(
    private customerService: CustomerService,
    private toaster: ToastrService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<UpdateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICustomer
  ) {}
 

  ngOnInit(): void {
    let dateString = this.datePipe.transform(
      this.data.customerDob,
      'yyyy-MM-dd'
    );
    this.data.customerDob = dateString;
    this.editData = this.data;
  }

  editData!: ICustomer;

  editCustomer() {
    this.customerService
      .updateCustomer(this.editData.customerId!, this.editData)
      .subscribe(
        (response) => {
          this.toaster.success(response, 'Success');
          this.dialogRef.close();
        },
        (error) => {
          this.toaster.error(error['error'], 'Error');
        }
      );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
