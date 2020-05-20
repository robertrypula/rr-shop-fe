import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'promotionPrice'
})
export class PromotionPricePipe implements PipeTransform {
  public transform(priceUnitBeforePromotion: number): number {
    return Math.abs(priceUnitBeforePromotion);
  }
}
