import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderService } from '../../services/order.service';
import { Type } from '../../models/order.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';

@Component({
  selector: 'rr-shop-potential-order',
  templateUrl: './potential-order.component.html',
  styleUrls: ['./potential-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PotentialOrderComponent implements OnInit {
  public isOrderValid$: Observable<boolean>;
  public priceSumDelivery$: Observable<number>;
  public priceSumNormal$: Observable<number>;
  public priceSumPayment$: Observable<number>;
  public priceSumTotal$: Observable<number>;

  public constructor(protected orderService: OrderService, protected orderFacadeService: OrderFacadeService) {
    this.isOrderValid$ = orderService.isOrderValid$;
    this.priceSumDelivery$ = orderService.priceSum$([Type.Delivery]);
    this.priceSumNormal$ = orderService.priceSum$([Type.Normal]);
    this.priceSumPayment$ = orderService.priceSum$([Type.Payment]);
    this.priceSumTotal$ = orderService.priceSum$([Type.Normal, Type.Delivery, Type.Payment]);
  }

  public ngOnInit() {}

  public createOrder(): void {
    this.orderFacadeService.createOrder();
  }
}
