import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StructuralNode } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { ProductFacadeService } from '../../store/facades/product-facade.service';

@Component({
  selector: 'rr-shop-payment-overview',
  templateUrl: './payment-overview.component.html',
  styleUrls: ['./payment-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentOverviewComponent implements OnInit {
  public productsPayment$: Observable<
    Product[]
  > = this.productFacadeService.productsFromCategoryByStructuralNode$(StructuralNode.Payment);

  public constructor(protected productFacadeService: ProductFacadeService) {}

  public ngOnInit() {}

  public trackBy(index: number, item: Product): string {
    return item.id + '';
  }
}
