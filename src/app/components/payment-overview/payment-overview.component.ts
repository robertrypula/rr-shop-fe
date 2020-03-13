import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StructuralNode } from '../../models/category.model';
import { OrderService } from '../../services/order.service';
import { OrderItem, Type } from '../../models/order.model';
import { ProductEnriched } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'rr-shop-payment-overview',
  templateUrl: './payment-overview.component.html',
  styleUrls: ['./payment-overview.component.scss']
})
export class PaymentOverviewComponent implements OnInit {
  public orderItemsPayment$: Observable<OrderItem[]>;
  public productsEnrichedPayment$: Observable<ProductEnriched[]>;

  public constructor(protected orderService: OrderService, protected productService: ProductService) {
    this.orderItemsPayment$ = this.orderService.orderItemsByType$([Type.Payment]);
    this.productsEnrichedPayment$ = this.productService.productsEnrichedFromCategoryByStructuralNode$(
      StructuralNode.Payment
    );
  }

  public ngOnInit() {}

  public trackBy(index: number, item: ProductEnriched): string {
    return item.id + '';
  }
}
