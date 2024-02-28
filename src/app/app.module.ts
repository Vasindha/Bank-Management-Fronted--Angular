import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFountComponent } from './components/not-fount/not-fount.component';
import { DepoWithdrawComponent } from './components/depo-withdraw/depo-withdraw.component';
import { AccountTableComponent } from './components/account-table/account-table.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { AccountStatusPipe } from './pipes/account-status.pipe';
import { TransactionTypePipe } from './pipes/transaction-type.pipe';
import { AccountTypePipe } from './pipes/account-type.pipe';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { SearchCustomerComponent } from './components/search-customer/search-customer.component';
import { CustomTransactionComponent } from './components/custom-transaction/custom-transaction.component';
import { DatePipe } from '@angular/common';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {IgxListModule} from 'igniteui-angular';
@NgModule({
  declarations: [
    AppComponent,
    CustomerTableComponent,
    AddAccountComponent,
    NavBarComponent,
    NotFountComponent,
    DepoWithdrawComponent,
    AccountTableComponent,
    UpdateCustomerComponent,
    TransactionTableComponent,
    AccountStatusPipe,
    TransactionTypePipe,
    AccountTypePipe,
    SearchCustomerComponent,
    CustomTransactionComponent,
    DeleteDialogComponent,
    LoaderComponent,
    HomeComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    NgxBootstrapIconsModule,
    MatDialogActions,
    MatTableModule,
    MatPaginatorModule,
    IgxListModule
   
  ],
  providers: [DatePipe, [provideToastr(), provideAnimations()]],
  bootstrap: [AppComponent]
})
export class AppModule {
}
