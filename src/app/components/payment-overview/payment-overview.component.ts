import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StructuralNode } from '../../models/category.model';
import { ProductEnriched } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'rr-shop-payment-overview',
  templateUrl: './payment-overview.component.html',
  styleUrls: ['./payment-overview.component.scss']
})
export class PaymentOverviewComponent implements OnInit {
  public productsEnrichedPayment$: Observable<
    ProductEnriched[]
  > = this.productService.productsEnrichedFromCategoryByStructuralNode$(StructuralNode.Payment);

  public constructor(protected productService: ProductService) {}

  public ngOnInit() {}

  public trackBy(index: number, item: ProductEnriched): string {
    return item.id + '';
  }
}
