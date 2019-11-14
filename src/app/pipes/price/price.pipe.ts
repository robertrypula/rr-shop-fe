import { Pipe, PipeTransform } from '@angular/core';
import { CURRENCY } from '../../config/core.config';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  public transform(value: number, ...args: any[]): any {
    return `${value.toFixed(2)} ${CURRENCY}`;
  }
}
