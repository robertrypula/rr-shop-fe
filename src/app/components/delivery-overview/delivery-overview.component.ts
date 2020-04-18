import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../models/product.model';
import { StructuralNode } from '../../models/category.model';
import { ProductFacadeService } from '../../store/facades/product-facade.service';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { POTENTIAL_ORDER_UUID } from '../../store/reducers/order.reducers';
import { Order } from '../../models/order.model';

@Component({
  selector: 'rr-shop-delivery-overview',
  templateUrl: './delivery-overview.component.html',
  styleUrls: ['./delivery-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryOverviewComponent implements OnInit, OnDestroy {
  public order$: Observable<Order> = this.orderFacadeService.orderByUuid$(POTENTIAL_ORDER_UUID);
  public productsDelivery$: Observable<Product[]> = this.productFacadeService.productsFromCategoryByStructuralNode$(
    StructuralNode.Delivery
  );

  public constructor(
    protected productFacadeService: ProductFacadeService,
    protected orderFacadeService: OrderFacadeService
  ) {}

  public ngOnInit(): void {
    (window as any).onInPostParcelLockerChange = (parcelLocker: string): void => {
      this.onInPostParcelLockerChange(parcelLocker);
    };
  }

  public ngOnDestroy(): void {
    (window as any).onInPostParcelLockerChange = null;
  }

  public onChooseParcelLockerClick(): void {
    (window as any).openInPostParcelLockerModal && (window as any).openInPostParcelLockerModal(900, 600);
  }

  protected onInPostParcelLockerChange(parcelLocker: string): void {
    this.orderFacadeService.chooseParcelLocker(parcelLocker);
  }

  public trackBy(index: number, item: Product): string {
    return item.id + '';
  }
}
