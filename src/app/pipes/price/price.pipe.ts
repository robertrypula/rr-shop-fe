import { Pipe, PipeTransform } from '@angular/core';
import { CURRENCY } from '../../config/config';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  public transform(value: number): string {
    return `${value.toFixed(2)} ${CURRENCY}`;
  }
}
