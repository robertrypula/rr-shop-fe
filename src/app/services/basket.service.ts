import { Injectable } from '@angular/core';
import { BarService } from './bar.service';
import { Product } from '../models/product.model';
import { BasketFacadeService } from '../store/facades/basket-facade.service';
import { Observable } from 'rxjs';
import { BasketEntry, BasketSimpleEntry, Type } from '../models/basket.model';
import { select } from '@ngrx/store';
import * as fromBasketSelectors from '../store/selectors/basket.selectors';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public priceTotal$: Observable<number>;
  public quantityTotal$: Observable<number>;

  public constructor(protected barService: BarService, protected basketFacadeService: BasketFacadeService) {
    this.priceTotal$ = basketFacadeService.priceTotal$;
    this.quantityTotal$ = basketFacadeService.quantityTotal$;
  }

  public add(product: Product, quantity = 1): void {
    const basketSimpleEntry: BasketSimpleEntry = this.basketFacadeService.getBasketSimpleEntryByProductId(product.id);

    if (basketSimpleEntry) {
      this.basketFacadeService.quantitySetTo(basketSimpleEntry.id, basketSimpleEntry.quantity + quantity);
    } else {
      this.basketFacadeService.add(product, quantity);
    }
    this.barService.showSuccess(`Produkt '${product.name}' dodany do koszyka`); // TODO translations
  }

  public chooseDelivery(productId: number): void {
    this.basketFacadeService.chooseDelivery(productId);
  }

  public choosePayment(productId: number): void {
    this.basketFacadeService.choosePayment(productId);
  }

  public basketEntriesByType$(type: Type): Observable<BasketEntry[]> {
    return this.basketFacadeService.basketEntriesByType$(type);
  }

  public quantityDecrement(id: number): void {
    this.basketFacadeService.quantityDecrement(id);
  }

  public quantityIncrement(id: number): void {
    this.basketFacadeService.quantityIncrement(id);
  }

  public quantitySetTo(id: number, quantity: number): void {
    this.basketFacadeService.quantitySetTo(id, quantity);
  }

  public remove(id: number): void {
    this.basketFacadeService.remove(id);
    this.barService.showSuccess(`Produkt usunięty z koszyka`); // TODO translations
  }
}
