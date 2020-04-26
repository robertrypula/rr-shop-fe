import { Injectable } from '@angular/core';

import { OrderFacadeService } from '../store/facades/order-facade.service';
import { Product } from '../models/product.model';

import { BarService } from './bar.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // TODO migrate everything to facade and remove service
  public constructor(protected barService: BarService, protected orderFacadeService: OrderFacadeService) {}

  public add(product: Product): void {
    this.orderFacadeService.add(product);
    this.barService.showSuccess(`Produkt '${product.name}' dodany do koszyka`); // TODO translations
  }

  public remove(id: number): void {
    this.orderFacadeService.remove(id);
    this.barService.showSuccess(`Produkt usunięty z koszyka`); // TODO translations
  }
}
