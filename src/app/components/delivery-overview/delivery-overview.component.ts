import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StructuralNode } from '../../models/category.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { Order } from '../../models/order.model';
import { POTENTIAL_ORDER_UUID } from '../../store/reducers/order.reducers';
import { ProductFacadeService } from '../../store/facades/product-facade.service';
import { Product } from '../../models/product.model';
import { RootService } from '../../services/root.service';

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
    protected orderFacadeService: OrderFacadeService,
    protected rootService: RootService
  ) {}

  public ngOnInit(): void {
    if (this.rootService.isPlatformBrowser) {
      this.rootService.rrShopWindow.onInPostParcelLockerChange = (parcelLocker: string): void => {
        this.onInPostParcelLockerChange(parcelLocker);
      };
    }
  }

  public ngOnDestroy(): void {
    if (this.rootService.isPlatformBrowser) {
      this.rootService.rrShopWindow.onInPostParcelLockerChange = null;
    }
  }

  public onChooseParcelLockerClick(): void {
    if (this.rootService.isPlatformBrowser) {
      this.rootService.rrShopWindow.openInPostParcelLockerModal &&
        this.rootService.rrShopWindow.openInPostParcelLockerModal(900, 600);
    }
  }

  protected onInPostParcelLockerChange(parcelLocker: string): void {
    this.orderFacadeService.chooseParcelLocker(parcelLocker);
  }

  public trackBy(index: number, item: Product): string {
    return item.id + '';
  }
}
