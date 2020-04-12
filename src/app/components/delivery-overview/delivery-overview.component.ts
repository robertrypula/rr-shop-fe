import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
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
export class DeliveryOverviewComponent implements OnInit, OnDestroy {
  public productsDelivery$: Observable<Product[]> = this.productFacadeService.productsFromCategoryByStructuralNode$(
    StructuralNode.Delivery
  );

  public constructor(protected productFacadeService: ProductFacadeService) {}

  public ngOnInit(): void {
    (window as any).onInPostParcelLockerChange = (name: string): void => {
      this.onInPostParcelLockerChange(name);
    };
  }

  public ngOnDestroy(): void {
    (window as any).onInPostParcelLockerChange = null;
  }

  public onParcelLockerClick(): void {
    (window as any).openInPostParcelLockerModal && (window as any).openInPostParcelLockerModal(400, 800);
  }

  protected onInPostParcelLockerChange(name: string): void {
    console.log('Angular', name);
  }

  public trackBy(index: number, item: Product): string {
    return item.id + '';
  }
}
