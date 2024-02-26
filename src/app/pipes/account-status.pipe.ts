import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountStatus'
})
export class AccountStatusPipe implements PipeTransform {

  transform(value:number): string {
    if(value == 0) return "Active";
    else return "Inactive"
  }

}
