import { Injectable } from '@angular/core';

import { BarFacadeService } from '../../store/facades/bar-facade.service';
import { Product } from '../../models/product.model';
import { BASKET_BAR_SUCCESS_MESSAGE_HIDE_DELAY } from '../../config/basket.config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public constructor(protected barFacade: BarFacadeService) {}

  public addToBasket(product: Product): void {
    let lastId: number;

    this.barFacade.showSuccess(`Produkt '${product.name}' dodany do koszyka`);
    lastId = this.barFacade.getLastId();
    setTimeout((): void => this.barFacade.close(lastId), BASKET_BAR_SUCCESS_MESSAGE_HIDE_DELAY);
  }
}
