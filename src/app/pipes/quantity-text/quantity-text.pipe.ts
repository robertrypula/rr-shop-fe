import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantityText'
})
export class QuantityTextPipe implements PipeTransform {
  public transform(quantity: number): string {
    if (quantity <= 0) {
      return 'brak';
    } else if (quantity <= 3) {
      return 'mała';
    }

    return 'duża';
  }
}
