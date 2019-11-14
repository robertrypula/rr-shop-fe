import { Injectable } from '@angular/core';
import { ProductBoxAbstractService } from '../product-box-abstract.service';
import { BasketService } from '../../../services/basket.service';

@Injectable({
  providedIn: 'root'
})
export class ProductBoxCompactService extends ProductBoxAbstractService {
  public constructor(basketService: BasketService) {
    super(basketService);
    console.log('ProductBoxCompactService');
  }
}
