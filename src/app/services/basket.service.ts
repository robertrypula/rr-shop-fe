import { Injectable } from '@angular/core';
import { BarService } from './bar.service';
import { Product } from '../models/product.model';
import { BasketFacadeService } from '../store/facades/basket-facade.service';
import { Observable } from 'rxjs';
import { BasketEntry } from '../models/basket.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public basketEntries$: Observable<BasketEntry[]>;

  public constructor(protected barService: BarService, protected basketFacadeService: BasketFacadeService) {
    this.basketEntries$ = basketFacadeService.basketEntries$;
  }

  public add(product: Product, quantity = 1): void {
    this.basketFacadeService.add(product, quantity);
    this.barService.showSuccess(`Produkt '${product.name}' dodany do koszyka`); // TODO translations
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
