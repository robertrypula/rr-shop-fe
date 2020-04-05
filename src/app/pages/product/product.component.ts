import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../models/product.model';
import { OrderService } from '../../services/order.service';
import { Size } from '../../models/image.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { ProductFacadeService } from '../../store/facades/product-facade.service';

@Component({
  selector: 'rr-shop-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  public activeProduct$: Observable<Product> = this.productFacadeService.activeProduct$;

  public readonly Size = Size;

  public constructor(
    protected productFacadeService: ProductFacadeService,
    protected orderService: OrderService,
    protected orderFacadeService: OrderFacadeService
  ) {}

  public ngOnInit(): void {}

  public addToOrder(product: Product): void {
    this.orderService.add(product);
  }

  public quantityDecrement(id: number): void {
    this.orderFacadeService.quantityDecrement(id);
  }

  public quantityIncrement(id: number): void {
    this.orderFacadeService.quantityIncrement(id);
  }

  public remove(id: number): void {
    this.orderService.remove(id);
  }
}
