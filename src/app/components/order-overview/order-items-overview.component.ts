import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { OrderItem } from '../../models/order-item.model';

@Component({
  selector: 'rr-shop-order-items-overview',
  templateUrl: './order-items-overview.component.html',
  styleUrls: ['./order-items-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderItemsOverviewComponent implements OnInit {
  @Input()
  public orderItemsByProductType: OrderItem[] = [];

  public constructor() {}

  public ngOnInit(): void {}

  public trackBy(index: number, item: OrderItem): string {
    return item.id + '';
  }
}
