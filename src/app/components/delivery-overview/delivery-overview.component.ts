import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderService } from '../../services/order.service';
import { OrderEntry, Type } from '../../models/order.model';
import { ProductService } from '../../services/product.service';
import { ProductEnriched } from '../../models/product.model';
import { StructuralNode } from '../../models/category.model';

@Component({
  selector: 'rr-shop-delivery-overview',
  templateUrl: './delivery-overview.component.html',
  styleUrls: ['./delivery-overview.component.scss']
})
export class DeliveryOverviewComponent implements OnInit {
  public orderEntriesDelivery$: Observable<OrderEntry[]>;
  public productsEnrichedDelivery$: Observable<ProductEnriched[]>;

  public constructor(protected orderService: OrderService, protected productService: ProductService) {
    this.orderEntriesDelivery$ = this.orderService.orderEntriesByType$([Type.Delivery]);
    this.productsEnrichedDelivery$ = this.productService.productsEnrichedFromCategoryByStructuralNode$(
      StructuralNode.Delivery
    );
  }

  public ngOnInit() {}

  public trackBy(index: number, item: ProductEnriched): string {
    return item.id + '';
  }
}
