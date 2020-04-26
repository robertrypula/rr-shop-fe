import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'rr-shop-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPageComponent implements OnInit {
  public activeOrder$: Observable<Order> = this.orderFacadeService.activeOrder$;

  public constructor(protected orderFacadeService: OrderFacadeService) {}

  public ngOnInit(): void {}
}
