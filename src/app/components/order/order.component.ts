import { Component, Input, OnInit } from '@angular/core';

import { Order, Status } from '../../models/order.model';
import { PaymentType, Type } from '../../models/product.model';

@Component({
  selector: 'rr-shop-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @Input()
  public order: Order;

  public readonly Status = Status;
  public readonly Type = Type;
  public readonly PaymentType = PaymentType;

  public ngOnInit(): void {}
}
