import { Product } from '../../models/product.model';
import { BasketService } from '../../services/basket.service';

export class ProductBoxAbstractService {
  protected constructor(protected basketService: BasketService) {}

  public addToBasket(product: Product): void {
    this.basketService.add(product);
  }
}
