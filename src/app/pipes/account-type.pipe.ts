import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountType'
})
export class AccountTypePipe implements PipeTransform {

  transform(value: number): string {
    if(value == 0) return 'Saving Account';
    return 'Current Account';
  }

}
