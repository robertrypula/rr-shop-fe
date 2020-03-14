import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Order, Type } from '../../models/order.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { POTENTIAL_ORDER_ID } from '../../store/reducers/order.reducers';

@Component({
  selector: 'rr-shop-potential-order',
  templateUrl: './potential-order.component.html',
  styleUrls: ['./potential-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PotentialOrderComponent implements OnInit {
  public isOrderValid$: Observable<boolean> = this.orderFacadeService.isOrderValid$;
  public potentialOrder$: Observable<Order> = this.orderFacadeService.orderByUuid$(`${POTENTIAL_ORDER_ID}`);
  public priceSumDelivery$: Observable<number> = this.orderFacadeService.priceSum$([Type.Delivery]);
  public priceSumNormal$: Observable<number> = this.orderFacadeService.priceSum$([Type.Normal]);
  public priceSumPayment$: Observable<number> = this.orderFacadeService.priceSum$([Type.Payment]);
  public priceSumTotal$: Observable<number> = this.orderFacadeService.priceSum$([
    Type.Normal,
    Type.Delivery,
    Type.Payment
  ]);

  public constructor(protected orderFacadeService: OrderFacadeService) {}

  public ngOnInit(): void {}

  public createOrder(): void {
    this.orderFacadeService.createOrder();
  }
}
