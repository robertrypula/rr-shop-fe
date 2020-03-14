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
  public potentialOrder$: Observable<Order> = this.orderFacadeService.orderByUuid$(`${POTENTIAL_ORDER_ID}`);

  public constructor(protected orderFacadeService: OrderFacadeService) {}

  public ngOnInit(): void {}

  public createOrder(): void {
    this.orderFacadeService.createOrder();
  }
}
