import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product, ProductEnriched } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { BasketService } from '../../services/basket.service';
import { Size } from '../../models/image.model';

@Component({
  selector: 'rr-shop-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  public activeProductEnriched$: Observable<ProductEnriched> = this.productService.activeProductEnriched$;

  public readonly Size = Size;

  public constructor(protected productService: ProductService, protected basketService: BasketService) {}

  public ngOnInit(): void {}

  public addToBasket(product: Product): void {
    this.basketService.add(product);
  }

  public quantityDecrement(id: number): void {
    this.basketService.quantityDecrement(id);
  }

  public quantityIncrement(id: number): void {
    this.basketService.quantityIncrement(id);
  }

  public remove(id: number): void {
    this.basketService.remove(id);
  }
}
