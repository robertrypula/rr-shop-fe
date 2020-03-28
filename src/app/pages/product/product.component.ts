import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductEnriched } from '../../models/product.model';
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
  public activeProductEnriched$: Observable<ProductEnriched> = this.productFacadeService.activeProductEnriched$;

  public readonly Size = Size;

  public constructor(
    protected productFacadeService: ProductFacadeService,
    protected orderService: OrderService,
    protected orderFacadeService: OrderFacadeService
  ) {}

  public ngOnInit(): void {}

  public addToOrder(productEnriched: ProductEnriched): void {
    this.orderService.add(productEnriched);
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
