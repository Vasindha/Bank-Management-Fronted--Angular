import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../../models/customer_model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrl: './search-customer.component.scss',
})
export class SearchCustomerComponent implements OnInit {
  customerData: ICustomer[] = [];
  customerAadhar!: number;
  headerData = [
    'CUSTOMER NAME',
    'CUSTOMER ADDRESS',
    'MOBILE',
    'AADHAR NO',
    'EMAIL',
    'DATE OF BIRTH',
    'ACCOUNT',
    'EDIT',
    'DELETE',
  ];

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.customerAadhar = Number(params['aadharNumber']);

      if (!isNaN(this.customerAadhar))
        this.customerService.getCustomerByAadhar(this.customerAadhar).subscribe(
          (data) => {
            this.customerData.push(data);
          },
          (error) => {}
        );
      else {
        this.customerService
          .getCustomerByName(params['name'])
          .subscribe((data) => {
            this.customerData = data;
          });
      }
    });
  }

  navigateToAccount(customerId: number) {
    this.router.navigate(['/account', customerId]);
  }

  openDelete(customerId: number) {
    let dialgoRef = this.dialog.open(DeleteDialogComponent, {
      width: '25%',
      height: '30%',
      data: customerId,
    });
    dialgoRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
  }
  opendEditDialog(custData: ICustomer) {
    let dialgoRef = this.dialog.open(UpdateCustomerComponent, {
      height: '60%',
      width: '60%',
      data: custData,
    });
    dialgoRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
  }
}
