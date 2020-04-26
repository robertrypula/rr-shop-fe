import { Pipe, PipeTransform } from '@angular/core';

import { CURRENCY } from '../../config';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  public transform(value: number): string {
    return `${(value ? value : 0).toFixed(2)} ${CURRENCY}`;
  }
}
