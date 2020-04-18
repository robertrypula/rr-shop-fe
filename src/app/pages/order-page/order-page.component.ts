import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from '../../models/order.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';

@Component({
  selector: 'rr-shop-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  public activeOrder$: Observable<Order> = this.orderFacadeService.activeOrder$;

  public constructor(protected orderFacadeService: OrderFacadeService) {}

  public ngOnInit(): void {}
}
