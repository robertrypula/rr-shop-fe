import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { OrderEntry } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';
import { Size } from '../../../models/image.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[rr-shop-order-overview-item]',
  templateUrl: './order-overview-item.component.html',
  styleUrls: ['./order-overview-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderOverviewItemComponent implements OnInit {
  @Input()
  public orderEntry: OrderEntry;

  public readonly Size = Size;

  public constructor(protected orderService: OrderService) {}

  public ngOnInit(): void {}

  public quantityDecrement(id: number): void {
    this.orderService.quantityDecrement(id);
  }

  public quantityIncrement(id: number): void {
    this.orderService.quantityIncrement(id);
  }

  public remove(id: number): void {
    this.orderService.remove(id);
  }
}
