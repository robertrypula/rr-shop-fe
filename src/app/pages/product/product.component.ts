import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'rr-shop-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  public activeProduct$: Observable<Product>;

  public constructor(protected productService: ProductService, protected basketService: BasketService) {
    this.activeProduct$ = productService.activeProduct$;
  }

  public ngOnInit(): void {}

  public addToBasket(product: Product): void {
    this.basketService.add(product);
  }
}
