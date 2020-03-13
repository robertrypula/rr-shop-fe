import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductService } from '../../services/product.service';
import { ProductEnriched } from '../../models/product.model';
import { StructuralNode } from '../../models/category.model';

@Component({
  selector: 'rr-shop-delivery-overview',
  templateUrl: './delivery-overview.component.html',
  styleUrls: ['./delivery-overview.component.scss']
})
export class DeliveryOverviewComponent implements OnInit {
  public productsEnrichedDelivery$: Observable<
    ProductEnriched[]
  > = this.productService.productsEnrichedFromCategoryByStructuralNode$(StructuralNode.Delivery);

  public constructor(protected productService: ProductService) {}

  public ngOnInit(): void {}

  public trackBy(index: number, item: ProductEnriched): string {
    return item.id + '';
  }
}
