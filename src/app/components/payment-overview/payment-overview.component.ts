import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StructuralNode } from '../../models/category.model';
import { BasketService } from '../../services/basket.service';
import { BasketEntry, Type } from '../../models/basket.model';
import { ProductEnriched } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'rr-shop-payment-overview',
  templateUrl: './payment-overview.component.html',
  styleUrls: ['./payment-overview.component.scss']
})
export class PaymentOverviewComponent implements OnInit {
  public basketEntriesPayment$: Observable<BasketEntry[]>;
  public productsEnrichedPayment$: Observable<ProductEnriched[]>;

  public constructor(protected basketService: BasketService, protected productService: ProductService) {
    this.basketEntriesPayment$ = this.basketService.basketEntriesByType$(Type.Payment);
    this.productsEnrichedPayment$ = this.productService.productsEnrichedFromCategoryByStructuralNode$(
      StructuralNode.Payment
    );
  }

  public ngOnInit() {}
}
