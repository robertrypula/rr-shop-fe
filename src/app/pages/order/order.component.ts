import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Order, Status } from '../../models/order.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { Type } from '../../models/product.model';

@Component({
  selector: 'rr-shop-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public activeOrder$: Observable<Order> = this.orderFacadeService.activeOrder$;

  public readonly Status = Status;
  public readonly Type = Type;

  public constructor(protected orderFacadeService: OrderFacadeService) {}

  public ngOnInit(): void {}
}
