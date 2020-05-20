import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'promotionText'
})
export class PromotionTextPipe implements PipeTransform {
  public transform(priceUnitBeforePromotion: number): string {
    return priceUnitBeforePromotion > 0 ? 'Promocja' : priceUnitBeforePromotion < 0 ? 'Wyprzedaż' : '';
  }
}
