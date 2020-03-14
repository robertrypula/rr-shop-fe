import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StructuralNode } from '../../models/category.model';
import { ProductEnriched } from '../../models/product.model';
import { ProductFacadeService } from '../../store/facades/product-facade.service';

@Component({
  selector: 'rr-shop-payment-overview',
  templateUrl: './payment-overview.component.html',
  styleUrls: ['./payment-overview.component.scss']
})
export class PaymentOverviewComponent implements OnInit {
  public productsEnrichedPayment$: Observable<
    ProductEnriched[]
  > = this.productFacadeService.productsEnrichedFromCategoryByStructuralNode$(StructuralNode.Payment);

  public constructor(protected productFacadeService: ProductFacadeService) {}

  public ngOnInit() {}

  public trackBy(index: number, item: ProductEnriched): string {
    return item.id + '';
  }
}
