import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../models/product.model';
import { StructuralNode } from '../../models/category.model';
import { ProductFacadeService } from '../../store/facades/product-facade.service';

@Component({
  selector: 'rr-shop-delivery-overview',
  templateUrl: './delivery-overview.component.html',
  styleUrls: ['./delivery-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryOverviewComponent implements OnInit {
  public productsDelivery$: Observable<
    Product[]
  > = this.productFacadeService.productsFromCategoryByStructuralNode$(StructuralNode.Delivery);

  public constructor(protected productFacadeService: ProductFacadeService) {}

  public ngOnInit(): void {}

  public trackBy(index: number, item: Product): string {
    return item.id + '';
  }
}
