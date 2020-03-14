import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductEnriched } from '../../models/product.model';
import { StructuralNode } from '../../models/category.model';
import { ProductFacadeService } from '../../store/facades/product-facade.service';

@Component({
  selector: 'rr-shop-delivery-overview',
  templateUrl: './delivery-overview.component.html',
  styleUrls: ['./delivery-overview.component.scss']
})
export class DeliveryOverviewComponent implements OnInit {
  public productsEnrichedDelivery$: Observable<
    ProductEnriched[]
  > = this.productFacadeService.productsEnrichedFromCategoryByStructuralNode$(StructuralNode.Delivery);

  public constructor(protected productFacadeService: ProductFacadeService) {}

  public ngOnInit(): void {}

  public trackBy(index: number, item: ProductEnriched): string {
    return item.id + '';
  }
}
