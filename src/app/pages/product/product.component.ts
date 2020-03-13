import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product, ProductEnriched } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
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

  public constructor(protected productService: ProductService, protected orderService: OrderService) {}

  public ngOnInit(): void {}

  public addToOrder(product: Product): void {
    this.orderService.add(product);
  }

  public quantityDecrement(id: number): void {
    this.orderService.quantityDecrement(id);
  }

  public quantityIncrement(id: number): void {
    this.orderService.quantityIncrement(id);
  }

  public remove(id: number): void {
    this.orderService.remove(id);
  }
}
