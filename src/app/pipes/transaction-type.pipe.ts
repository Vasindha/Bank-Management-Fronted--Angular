import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionType'
})
export class TransactionTypePipe implements PipeTransform {

  transform(value:number): string {
    if(value == 0) return 'Deposit'
    if(value==1)return "Withdraw"
    return "Transfer"
   }

}
