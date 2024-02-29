import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerTableComponent } from './components/customer-table/customer-table.component';
import { AccountTableComponent } from './components/account-table/account-table.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { DepoWithdrawComponent } from './components/depo-withdraw/depo-withdraw.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { NotFountComponent } from './components/not-fount/not-fount.component';
import { SearchCustomerComponent } from './components/search-customer/search-customer.component';
import { CustomTransactionComponent } from './components/custom-transaction/custom-transaction.component';
import { LoaderComponent } from './components/loader/loader.component';

const routes: Routes = [
  { path: '', component: CustomerTableComponent },
  { path: 'account/:id', component: AccountTableComponent },
  { path: 'search', component: SearchCustomerComponent },
  { path: 'transaction-detail/:id', component: TransactionTableComponent },
  { path: 'form', component: AddAccountComponent },
  {
    path: 'transaction',
    component: CustomTransactionComponent,
    children: [
      { path: 'transaction/:id', component: TransactionTableComponent },
    ],
  },
  { path: '**', component: NotFountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
