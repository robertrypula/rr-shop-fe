import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasketService } from '../../services/basket.service';
import { BasketEntry, Type } from '../../models/basket.model';
import { ProductService } from '../../services/product.service';
import { ProductEnriched } from '../../models/product.model';
import { StructuralNode } from '../../models/category.model';

@Component({
  selector: 'rr-shop-delivery-overview',
  templateUrl: './delivery-overview.component.html',
  styleUrls: ['./delivery-overview.component.scss']
})
export class DeliveryOverviewComponent implements OnInit {
  public basketEntriesDelivery$: Observable<BasketEntry[]>;
  public productsEnrichedDelivery$: Observable<ProductEnriched[]>;

  public constructor(protected basketService: BasketService, protected productService: ProductService) {
    this.basketEntriesDelivery$ = this.basketService.basketEntriesByType$(Type.Delivery);
    this.productsEnrichedDelivery$ = this.productService.productsEnrichedFromCategoryByStructuralNode$(
      StructuralNode.Delivery
    );
  }

  public ngOnInit() {}
}
